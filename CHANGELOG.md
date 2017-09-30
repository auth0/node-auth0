# Change Log

## [v2.7.1](https://github.com/auth0/node-auth0/tree/v2.7.1) (2017-09-30)
[Full Changelog](https://github.com/auth0/node-auth0/compare/v2.7.0...v2.7.1)

**Fixed**
- Fix auth/users.getInfo to return JSON (fixes #158) [\#192](https://github.com/auth0/node-auth0/pull/192) ([pilwon](https://github.com/pilwon))

**Security**
- Update request to address ReDoS vulnerability [\#206](https://github.com/auth0/node-auth0/pull/206) ([dancrumb](https://github.com/dancrumb))

## [v2.7.0](https://github.com/auth0/node-auth0/tree/v2.7.0) (2017-06-28)
[Full Changelog](https://github.com/auth0/node-auth0/compare/v2.6.0...v2.7.0)

**Added**
- Add password grant method [\#189](https://github.com/auth0/node-auth0/pull/189) ([hzalaz](https://github.com/hzalaz))
- Retrieve a user's Guardian enrollments [\#181](https://github.com/auth0/node-auth0/pull/181) ([joshuaali](https://github.com/joshuaali))
- Add get user logs [\#176](https://github.com/auth0/node-auth0/pull/176) ([amiram](https://github.com/amiram))

**Changed**
- Update packages and utilize error classes from rest-facade correctly (Fixes #154) [\#183](https://github.com/auth0/node-auth0/pull/183) ([charsleysa](https://github.com/charsleysa))

**Fixed**
- Fix impersonation to send AT in the params. [\#190](https://github.com/auth0/node-auth0/pull/190) ([hzalaz](https://github.com/hzalaz))
- Fixed minor typo in DatabaseAuthenticator module [\#184](https://github.com/auth0/node-auth0/pull/184) ([scostello-paanalytics](https://github.com/scostello-paanalytics))
- fix: avoid possible prototype override protection bypass [\#170](https://github.com/auth0/node-auth0/pull/170) ([AlmaasAre](https://github.com/AlmaasAre))

