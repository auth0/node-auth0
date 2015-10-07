var GraphQL = require('graphql')
var GraphQLRelay = require('graphql-relay')
var db = require('./database')

// This module exports a GraphQL Schema, which is a declaration of all the
// types, queries and mutations we'll use in our system.

// Relay adds some specific types that it needs to function, including Node, Edge, Connection

// Firstly we need to create the Node interface in our system. This has nothing
// to do with Node.js! In Relay, Node refers to an entity – that is, an object
// with an ID.

// To create this interface, we need to pass in a resolving function as the
// first arg to nodeDefinitions that can fetch an entity given a global Relay
// ID. The second arg can be used to resolve an entity into a GraphQL type –
// but it's actually optional, so we'll leave it out and use isTypeOf on the
// GraphQL types further below.

var nodeDefinitions = GraphQLRelay.nodeDefinitions(function(globalId) {
  var idInfo = GraphQLRelay.fromGlobalId(globalId)
  if (idInfo.type == 'User') {
    return db.getUser(idInfo.id)
  } else if (idInfo.type == 'Widget') {
    return db.getWidget(idInfo.id)
  }
  return null
})

// We can now use the Node interface in the GraphQL types of our schema

var widgetType = new GraphQL.GraphQLObjectType({
  name: 'Widget',
  description: 'A shiny widget',

  // Relay will use this function to determine if an object in your system is
  // of a particular GraphQL type
  isTypeOf: function(obj) { return obj instanceof db.Widget },

  // We can either declare our fields as an object of name-to-definition
  // mappings or a closure that returns said object (see userType below)
  fields: {
    id: GraphQLRelay.globalIdField('Widget'),
    name: {
      type: GraphQL.GraphQLString,
      description: 'The name of the widget',
    },
  },
  // This declares this GraphQL type as a Node
  interfaces: [nodeDefinitions.nodeInterface],
})

var userType = new GraphQL.GraphQLObjectType({
  name: 'User',
  description: 'A person who uses our app',
  isTypeOf: function(obj) { return obj instanceof db.User },

  // We use a closure here because we need to refer to widgetType from above
  fields: function() {
    return {
      id: GraphQLRelay.globalIdField('User'),
      name: {
        type: GraphQL.GraphQLString,
        description: 'The name of the user',
      },
      // Here we set up a paged one-to-many relationship ("Connection")
      widgets: {
        description: 'A user\'s collection of widgets',

        // Relay gives us helper functions to define the Connection and its args
        type: GraphQLRelay.connectionDefinitions({name: 'Widget', nodeType: widgetType}).connectionType,
        args: GraphQLRelay.connectionArgs,

        // You can define a resolving function for any field.
        // It can also return a promise if you need async data fetching
        resolve: function(user, args) {
          // This wraps a Connection object around your data array
          // Use connectionFromPromisedArray if you return a promise instead
          return GraphQLRelay.connectionFromArray(db.getWidgetsByUser(user.id), args)
        },
      },
    }
  },
  interfaces: [nodeDefinitions.nodeInterface],
})

// Now we can bundle our types up and export a schema
// GraphQL expects a set of top-level queries and optional mutations (we have
// none in this simple example so we leave the mutation field out)
module.exports = new GraphQL.GraphQLSchema({
  query: new GraphQL.GraphQLObjectType({
    name: 'Query',
    fields: {
      // Relay needs this to query Nodes using global IDs
      node: nodeDefinitions.nodeField,
      // Our own root query field(s) go here
      user: {
        type: userType,
        resolve: function() { return db.getAnonymousUser() },
      },
    },
  }),
})
