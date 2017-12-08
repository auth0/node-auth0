# Change Log

## [v2.9.1](https://github.com/auth0/node-auth0/tree/v2.9.1) (2017-12-08)
[Full Changelog](https://github.com/auth0/node-auth0/compare/v2.9.0...v2.9.1)

**Fixed**
- fixed missing data object error [\#224](https://github.com/auth0/node-auth0/pull/224) ([dctoon](https://github.com/dctoon))

## [v2.9.0](https://github.com/auth0/node-auth0/tree/v2.9.0) (2017-12-07)
[Full Changelog](https://github.com/auth0/node-auth0/compare/v2.8.0...v2.9.0)

**Added**
- Added support for /users-by-email method. [\#218](https://github.com/auth0/node-auth0/pull/218) ([kopertop](https://github.com/kopertop))
- Add retry functionality for management api requests [\#215](https://github.com/auth0/node-auth0/pull/215) ([dctoon](https://github.com/dctoon))

## [v2.8.0](https://github.com/auth0/node-auth0/tree/v2.8.0) (2017-09-30)
[Full Changelog](https://github.com/auth0/node-auth0/compare/v2.7.1...v2.8.0)

**Added**
- Added tokenProvider functionality [\#196](https://github.com/auth0/node-auth0/pull/196) ([dctoon](https://github.com/dctoon))

**Fixed**
- Fix wrapPropertyMethod mistake for updateClientGrant [\#202](https://github.com/auth0/node-auth0/pull/202) ([danedmunds](https://github.com/danedmunds))

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

