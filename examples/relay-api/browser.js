/* eslint-env es6 */
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

