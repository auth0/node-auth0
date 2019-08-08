# Change Log

## [v2.18.1](https://github.com/auth0/node-auth0/tree/v2.19.0) (2019-08-08)

**Added**

- Implement auth0-forwarded-for header passing in Authentication Client [\#401](https://github.com/auth0/node-auth0/pull/401) ([kjarmicki](https://github.com/kjarmicki))

**Changed**

- Improve JobManager (get errors + parse error message when importing users) [\#407](https://github.com/auth0/node-auth0/pull/407) ([jbauth0](https://github.com/jbauth0))

[Full Changelog](https://github.com/auth0/node-auth0/compare/v2.18.1...v2.19.0)

## [v2.18.0](https://github.com/auth0/node-auth0/tree/v2.18.1) (2019-07-23)

**Changed**

- Encode id param on GET [\#374](https://github.com/auth0/node-auth0/pull/374) ([luisrudge](https://github.com/luisrudge))

[Full Changelog](https://github.com/auth0/node-auth0/compare/v2.18.0...v2.18.1)

## [v2.18.0](https://github.com/auth0/node-auth0/tree/v2.18.0) (2019-06-26)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v2.17.1...v2.18.0)

**Added**

- Add Management API support for Branding and Prompts endpoints. [\#370](https://github.com/auth0/node-auth0/pull/370) ([chrisscott](https://github.com/chrisscott))

## [v2.17.1](https://github.com/auth0/node-auth0/tree/v2.17.1) (2019-05-22)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v2.17.0...v2.17.1)

**Fixed**

- Fix telemetry header [\#362](https://github.com/auth0/node-auth0/pull/362) ([lbalmaceda](https://github.com/lbalmaceda))

## [v2.17.0](https://github.com/auth0/node-auth0/tree/v2.17.0) (2019-04-15)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v2.16.0...v2.17.0)

**Added**

- Add method to assign users to a role [\#348](https://github.com/auth0/node-auth0/pull/348) ([pushpabrol](https://github.com/pushpabrol))
- Add support for roles and permissions [\#344](https://github.com/auth0/node-auth0/pull/344) ([pushpabrol](https://github.com/pushpabrol))

## [v2.16.0](https://github.com/auth0/node-auth0/tree/v2.16.0) (2019-03-18)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v2.15.0...v2.16.0)

**Added**

- Add support for Auth0 Grants [\#343](https://github.com/auth0/node-auth0/pull/343) ([jsmpereira](https://github.com/jsmpereira))

## [v2.15.0](https://github.com/auth0/node-auth0/tree/v2.15.0) (2019-03-11)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v2.14.0...v2.15.0)

**Added**

- Add users-exports endpoint [\#340](https://github.com/auth0/node-auth0/pull/340) ([arjenvanderende](https://github.com/arjenvanderende))

**Fixed**

- Don't validate id_token when alg is HS256 and there is no clientSecret [\#330](https://github.com/auth0/node-auth0/pull/330) ([luisrudge](https://github.com/luisrudge))

## [v2.14.0](https://github.com/auth0/node-auth0/tree/v2.14.0) (2018-11-12)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v2.13.0...v2.14.0)

**Added**

- Add method to refresh a token using a refresh_token [\#313](https://github.com/auth0/node-auth0/pull/313) ([modeswitch](https://github.com/modeswitch))
- Add all Guardian APIs [\#311](https://github.com/auth0/node-auth0/pull/311) ([stevezau](https://github.com/stevezau))
- Add Custom Domains methods [\#310](https://github.com/auth0/node-auth0/pull/310) ([stevezau](https://github.com/stevezau))
- Add send_completion_email and upsert params for importUsers [\#270](https://github.com/auth0/node-auth0/pull/270) ([Floppy](https://github.com/Floppy))

**Deprecated**

- Deprecate UsersManager.deleteAll and deleteAllUsers wrapper methods [\#309](https://github.com/auth0/node-auth0/pull/309) ([M-Zuber](https://github.com/M-Zuber))

## [v2.13.0](https://github.com/auth0/node-auth0/tree/v2.13.0) (2018-09-28)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v2.12.0...v2.13.0)

**Added**

- Add id_token validation (HS256 and RS256) [\#295](https://github.com/auth0/node-auth0/pull/295) ([luisrudge](https://github.com/luisrudge))

## [v2.12.0](https://github.com/auth0/node-auth0/tree/v2.12.0) (2018-08-09)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v2.11.0...v2.12.0)

**Added**

- Added authorizationCodeGrant method to OAuthAuthenticator [\#290](https://github.com/auth0/node-auth0/pull/290) ([cwurtz](https://github.com/cwurtz))
- Add Guardian Enrollments endpoints [\#278](https://github.com/auth0/node-auth0/pull/278) ([fmedinac](https://github.com/fmedinac))

## [v2.11.0](https://github.com/auth0/node-auth0/tree/v2.11.0) (2018-07-25)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v2.10.0...v2.11.0)

**Added**

- Added Pagination Docs for a Client Grants, Resouce Servers and Rules [\#282](https://github.com/auth0/node-auth0/pull/282) ([cocojoe](https://github.com/cocojoe))
- Added rules config methods [\#227](https://github.com/auth0/node-auth0/pull/227) ([dctoon](https://github.com/dctoon))

**Fixed**

- Get access token before importing users [\#267](https://github.com/auth0/node-auth0/pull/267) ([Floppy](https://github.com/Floppy))

## [v2.10.0](https://github.com/auth0/node-auth0/tree/v2.10.0) (2018-05-29)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v2.9.3...v2.10.0)

**Added**

- Adding pagination docs for clients/connections [\#268](https://github.com/auth0/node-auth0/pull/268) ([luisrudge](https://github.com/luisrudge))

**Fixed**

- Fix deleteUserMultifactor naming [\#259](https://github.com/auth0/node-auth0/pull/259) ([luisrudge](https://github.com/luisrudge))

## [v2.9.3](https://github.com/auth0/node-auth0/tree/v2.9.3) (2018-03-01)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v2.9.2...v2.9.3)

**Fixed**

- Add client secret to passwordGrant [\#217](https://github.com/auth0/node-auth0/pull/217) ([luisrudge](https://github.com/luisrudge))

## [v2.9.2](https://github.com/auth0/node-auth0/tree/v2.9.2) (2018-01-16)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v2.9.1...v2.9.2)

**Security**

- Update rest facade [\#232](https://github.com/auth0/node-auth0/pull/232) ([luisrudge](https://github.com/luisrudge))

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
