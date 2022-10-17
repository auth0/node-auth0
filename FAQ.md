# Frequently Asked Questions

Below are a number of questions or issues that have arisen from using the SDK.

## Does this library have type definitions?

The types for this library are currently maintained by the community at [Definitely Typed](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/auth0). The team is planning taking ownership of this library as discussed in https://github.com/auth0/node-auth0/issues/572.

### Getting `Error: Can't resolve 'superagent-proxy'` when bundling with Webpack

We have a dependency on `rest-facade` which `require`s but doesn't include `superagent-proxy`. This SDK doesn't support proxies, so this dependency is not required. To workaround this you can add the following to your `webpack.config.js`:

```
resolve: {
  alias: {
    'superagent-proxy': false
  }
}
```

Or install `superagent-proxy` yourself.
