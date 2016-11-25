# Relay-API Example

This example for authenticaiton with a Relay API is based on the [simple-relay-starter](https://github.com/mhart/simple-relay-starter) from [Michael Hart](https://twitter.com/hichaelmart). Big thanks to Michael for this starter kit!

Follow the installation instructions from [simple-relay-starter](https://github.com/mhart/simple-relay-starter), or simply add the authentication steps into your already-existing Relay app.

## Adding Authentication

First, add the `jwt` middleware to your `/graphql` endpoint.

```js

...

dotenv.load();

var authenticate = jwt({
  secret: process.env.AUTH0_CLIENT_SECRET,
  audience: process.env.AUTH0_CLIENT_ID
});

...

```

Next, set up your `.env` file with your credentials.

```bash
# .env

AUTH0_CLIENT_ID=AUTH0_CLIENT_SECRET
AUTH0_CLIENT_SECRET=AUTH0_CLIENT_ID
```

Finally, retrieve a JWT (be sure to provide JWT by adding value of the `id_token` in localStorage using your browser) and send it to the `/graphql` endpoint as a header.

```js
// App.js

var token = localStorage.getItem('id_token');

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('http://localhost:3000/graphql', {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
);
```

After that you can run development server by using `npm run dev` command.

---

A simple example of how to get started with
[Relay](https://facebook.github.io/relay/) using some slightly different
approaches to [relay-starter-kit](https://github.com/relayjs/relay-starter-kit)
that may make it easier to navigate for first-time users, especially Node.js
users.

Unlike [relay-starter-kit](https://github.com/relayjs/relay-starter-kit), this
project uses [Browserify](http://browserify.org/) instead of
[Webpack](https://webpack.github.io/), does not use a proxy for the GraphQL
endpoint and does not require ES6 features for any server-side code, so it can
be run directly with `node` – resulting in less boilerplate and making it
easier to understand the code.

Example
-------

```console
$ npm install
$ npm run build
$ npm start
```

Then navigate to [http://localhost:3000](http://localhost:3000) and
observe the network request to `/graphql` that Relay makes to retrieve the data.

For development, you can use:

```console
$ npm run dev
```

Which will build the schema and then watch for any file changes, rebuilding the
schema and/or restarting the server as necessary.

Here are the files involved:

`App.js`:
```js
var React = require('react')
var Relay = require('react-relay')

// A simple top-level component that illustrates how to render Relay-fetched
// data using props. In this case Relay will populate a `user` property that
// has a collection of `widgets` based on the queries and fragments we give it
// further below.
class App extends React.Component {
  render() {
    return (
      <div>
        <h2>User: {this.props.user.name}</h2>
        <h2>Widgets:</h2>
        <ul>
          {/* In schema/schema.js we define a Connection between users and widgets */}
          {/* Connections use `edges` and `node` to hold paging info and child items */}
          {this.props.user.widgets.edges.map(edge =>
            <li>{edge.node.name} (Global ID: {edge.node.id})</li>
          )}
        </ul>
      </div>
    )
  }
}

// The component we need to export is a Relay wrapper around our App component
// from above. It declares the GraphQL fragments where we list the properties
// we want to be fetched – eg, user.name, user.widgets.edges, etc
exports.Container = Relay.createContainer(App, {
  fragments: {
    // The property name here reflects what is added to `this.props` above.
    // This template string will be parsed by babel-relay-plugin when we browserify.
    user: () => Relay.QL`
      fragment on User {
        name,
        widgets(first: 10) {
          edges {
            node {
              id,
              name,
            },
          },
        },
      }
    `,
  },
})

// The Relay root container needs to know what queries will occur at the top
// level – these configurations are currently called Routes in Relay, but this
// name is misleading and under review so we don't use it here.
exports.queries = {
  name: 'AppQueries', // can be anything, just used as an identifier
  params: {},
  queries: {
    // We can use this shorthand so long as the component we pair this with has
    // a fragment named "user", as we do above.
    user: () => Relay.QL`query { user }`,
  },
}
```

`browser.js`:
```js
var React = require('react')
var ReactDOM = require('react-dom')
var Relay = require('react-relay')
var App = require('./App')

// This file is the entry point on the browser – browserify will compile it, as
// well as App.js and any other client-side dependencies and create
// public/bundle.js which will be requested by public/index.html

ReactDOM.render(
  // At the top of a Relay tree is the root container, which we pass our
  // wrapped App component to, as well as the query configuration ("route"). If
  // we need to render a different component, say as a result of a navigation
  // event, then we would update it here.
  // We also illustrate the use of the onReadyStateChange handler in case
  // there's a network error, etc
  <Relay.RootContainer Component={App.Container} route={App.queries}
    onReadyStateChange={({error}) => { if (error) console.error(error) }} />,

  document.getElementById('content')
)
```

`public/index.html`:
```html
<!-- include React and Relay scripts (we don't bundle them) -->
<script src=//cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react.min.js></script>
<script src=//cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react-dom.min.js></script>
<script src=/relay/relay.min.js></script>
<div id=content />
<!-- now request our browserified bundle which will run the React.render -->
<script src=/bundle.js></script>
```

`server.js`:
```js
var express = require('express')
var graphqlHttp = require('express-graphql')
var schema = require('./schema/schema')

// The server is just a simple Express app
var app = express()

// We respond to all GraphQL requests from `/graphql` using the
// `express-graphql` middleware, which we pass our schema to.
app.use('/graphql', graphqlHttp({schema: schema}))

// The rest of the routes are just for serving static files
app.use('/relay', express.static('./node_modules/react-relay/dist'))
app.use('/', express.static('./public'))

app.listen(3000, function() { console.log('Listening on 3000...') })
```

`schema/database.js`:
```js
// We use these types to hold data and resolve from GraphQL types in our schema

function User(id, name) {
  this.id = id.toString()
  this.name = name
}

function Widget(id, userId, name) {
  this.id = id.toString()
  this.userId = userId.toString()
  this.name = name
}

// In a realistic system, the get functions below would return objects from a
// datastore like a DB or a REST API instead of an in-memory store like this.
// You can also return promises for async fetching

var users = [new User(1, 'Anonymous')]

var widgets = [
  new Widget(1, 1, 'What\'s-it'),
  new Widget(2, 1, 'Who\'s-it'),
  new Widget(3, 1, 'How\'s-it'),
]

module.exports = {
  User: User,
  Widget: Widget,
  getUser: function(id) { return users.filter(function(u) { return u.id == id })[0] },
  getAnonymousUser: function() { return users[0] },
  getWidget: function(id) { return widgets.filter(function(w) { return w.id == id })[0] },
  getWidgetsByUser: function(userId) { return widgets.filter(function(w) { return w.userId == userId }) },
}
```

`schema/schema.js`:
```js
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
```
