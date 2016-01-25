# Deployment

## Versions

### Bumping version
In order to bump a version, just use the npm module.

~~~bash
# Breaking changes.
npm version major

# Non-breaking changes.
npm version minor

# Bug fixes.
npm version patch

# Specific version.
npm version 2.0.0
~~~

### Publishing the library
In order to publish, just execute `npm publish` and enter your account credentials.

~~~
npm publish
~~~
