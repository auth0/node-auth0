# Change Log

## [v4.13.0](https://github.com/auth0/node-auth0/tree/v4.13.0) (2024-11-12)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v4.12.0...v4.13.0)

**Added**

- CYOK implementation [\#1041](https://github.com/auth0/node-auth0/pull/1041) ([tusharpandey13](https://github.com/tusharpandey13))
- Feature/forms [\#1055](https://github.com/auth0/node-auth0/pull/1055) ([tusharpandey13](https://github.com/tusharpandey13))

## [v4.12.0](https://github.com/auth0/node-auth0/tree/v4.12.0) (2024-11-07)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v4.11.0...v4.12.0)

**Fixed**

- org cc/patch1 [\#1053](https://github.com/auth0/node-auth0/pull/1053) ([tusharpandey13](https://github.com/tusharpandey13))
- parameter name change for Organizations for Client Credentials [\#1052](https://github.com/auth0/node-auth0/pull/1052) ([tusharpandey13](https://github.com/tusharpandey13))
- Remove IGA trigger from e2e test [DXEX-4601] [\#1048](https://github.com/auth0/node-auth0/pull/1048) ([Widcket](https://github.com/Widcket))

## [v4.11.0](https://github.com/auth0/node-auth0/tree/v4.11.0) (2024-11-05)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v4.10.0...v4.11.0)

**Added**

- Fixed missing endpoints for feature Organizations for Client Credentials changes [\#1046](https://github.com/auth0/node-auth0/pull/1046) ([tusharpandey13](https://github.com/tusharpandey13))
- Creating RL workflow for node-auth0 repo [\#1044](https://github.com/auth0/node-auth0/pull/1044) ([arpit-jn](https://github.com/arpit-jn))

## [v4.10.0](https://github.com/auth0/node-auth0/tree/v4.10.0) (2024-09-10)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v4.9.0...v4.10.0)

**Added**

- Prompt Partial model changes [\#1035](https://github.com/auth0/node-auth0/pull/1035) ([tusharpandey13](https://github.com/tusharpandey13))
- Add organization support for client credentials to node-auth0 [\#1033](https://github.com/auth0/node-auth0/pull/1033) ([tusharpandey13](https://github.com/tusharpandey13))

## [v4.9.0](https://github.com/auth0/node-auth0/tree/v4.9.0) (2024-08-26)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v4.8.0...v4.9.0)

**Added**

- Node SDK support for SS-SSO [\#1028](https://github.com/auth0/node-auth0/pull/1028) ([tusharpandey13](https://github.com/tusharpandey13))
- Update Codecov Action with Token [\#1029](https://github.com/auth0/node-auth0/pull/1029) ([developerkunal](https://github.com/developerkunal))

**Changed**

- Update codeowner file with new GitHub team name [\#1025](https://github.com/auth0/node-auth0/pull/1025) ([stevenwong-okta](https://github.com/stevenwong-okta))

## [v4.8.0](https://github.com/auth0/node-auth0/tree/v4.8.0) (2024-08-02)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v4.7.0...v4.8.0)

**Added**

- Added support for client, tenant and resource level properties related to HRI [\#1024](https://github.com/auth0/node-auth0/pull/1024) ([gyaneshgouraw-okta](https://github.com/gyaneshgouraw-okta))
- Added support for users getSessions & getRefreshTokens endpoint in management api client [\#1021](https://github.com/auth0/node-auth0/pull/1021) ([gyaneshgouraw-okta](https://github.com/gyaneshgouraw-okta))
- Added support for Session & Refresh token in management api client [\#1019](https://github.com/auth0/node-auth0/pull/1019) ([gyaneshgouraw-okta](https://github.com/gyaneshgouraw-okta))

## [v4.7.0](https://github.com/auth0/node-auth0/tree/v4.7.0) (2024-07-08)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v4.6.0...v4.7.0)

**Added**

- Support SCIM features. [\#1016](https://github.com/auth0/node-auth0/pull/1016) ([nandan-bhat](https://github.com/nandan-bhat))

## [v4.6.0](https://github.com/auth0/node-auth0/tree/v4.6.0) (2024-06-20)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v4.5.0...v4.6.0)

**Added**

- Added enabled_clients in connection interface [\#1014](https://github.com/auth0/node-auth0/pull/1014) ([gyaneshgouraw-okta](https://github.com/gyaneshgouraw-okta))

**Fixed**

- Fixed bugs in the EXAMPLES.md's code snippets [\#994](https://github.com/auth0/node-auth0/pull/994) ([grjan7](https://github.com/grjan7))

**Security**

- Bump braces from 3.0.2 to 3.0.3 [\#1010](https://github.com/auth0/node-auth0/pull/1010) ([dependabot[bot]](https://github.com/apps/dependabot))

## [v4.5.0](https://github.com/auth0/node-auth0/tree/v4.5.0) (2024-06-14)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v4.4.1...v4.5.0)

**Changed**

- Support signing up with organization membership. [\#1012](https://github.com/auth0/node-auth0/pull/1012) ([nandan-bhat](https://github.com/nandan-bhat))

**⚠️ BREAKING CHANGES**

- Changes to `ResourceServer` interfaces (`ResourceServerTokenDialectEnum`, `ResourceServerCreateTokenDialectEnum` and `ResourceServerUpdateTokenDialectEnum`). [\#1012](https://github.com/auth0/node-auth0/pull/1012) ([nandan-bhat](https://github.com/nandan-bhat))
  - The key `token` is changed to `access_token`.
  - The key `token_authz` is changed to `access_token_authz`.

## [v4.4.1](https://github.com/auth0/node-auth0/tree/v4.4.1) (2024-06-11)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v4.4.0...v4.4.1)

**Fixed**

- fix: Fixed undici-types error by updating the dependecy [\#1008](https://github.com/auth0/node-auth0/pull/1008) ([gyaneshgouraw-okta](https://github.com/gyaneshgouraw-okta))

## [v4.4.0](https://github.com/auth0/node-auth0/tree/v4.4.0) (2024-05-07)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v4.3.1...v4.4.0)

**Added**

- Added new values of token_dialect in management api generated section [\#1003](https://github.com/auth0/node-auth0/pull/1003) ([gyaneshgouraw-okta](https://github.com/gyaneshgouraw-okta))
- Added changes to support mTLS authentication [\#1002](https://github.com/auth0/node-auth0/pull/1002) ([gyaneshgouraw-okta](https://github.com/gyaneshgouraw-okta))
- Added additional request parameter to support PAR with JAR requests [\#995](https://github.com/auth0/node-auth0/pull/995) ([gyaneshgouraw-okta](https://github.com/gyaneshgouraw-okta))
- Added new authorization_details parameter to support RAR requests [\#997](https://github.com/auth0/node-auth0/pull/997) ([gyaneshgouraw-okta](https://github.com/gyaneshgouraw-okta))
- Bump jose from 4.14.4 to 4.15.5 [\#993](https://github.com/auth0/node-auth0/pull/993) ([dependabot[bot]](https://github.com/apps/dependabot))

## [v4.3.1](https://github.com/auth0/node-auth0/tree/v4.3.1) (2024-02-09)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v4.3.0...v4.3.1)

**Changed**

- Add support for show_as_button on organization connections [\#988](https://github.com/auth0/node-auth0/pull/988) ([frederikprijck](https://github.com/frederikprijck))

## [v4.3.0](https://github.com/auth0/node-auth0/tree/v4.3.0) (2024-01-31)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v4.2.0...v4.3.0)

**Added**

- Add support for prompt partials [\#985](https://github.com/auth0/node-auth0/pull/985) ([frederikprijck](https://github.com/frederikprijck))

## [v4.2.0](https://github.com/auth0/node-auth0/tree/v4.2.0) (2023-12-07)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v4.1.0...v4.2.0)

**Added**

- Add support for Pushed Authorization Requests [\#973](https://github.com/auth0/node-auth0/pull/973) ([frederikprijck](https://github.com/frederikprijck))

## [v4.1.0](https://github.com/auth0/node-auth0/tree/v4.1.0) (2023-10-30)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v4.0.2...v4.1.0)

**Added**

- [SDK-4646] Add MFA tenant setting and handle deprecations [\#960](https://github.com/auth0/node-auth0/pull/960) ([adamjmcgrath](https://github.com/adamjmcgrath))

## [v4.0.2](https://github.com/auth0/node-auth0/tree/v4.0.2) (2023-10-25)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v4.0.1...v4.0.2)

**Changed**

- Export models that are using in the runtime [\#954](https://github.com/auth0/node-auth0/pull/954) ([frederikprijck](https://github.com/frederikprijck))
- Type errorCode as possibly undefined [\#953](https://github.com/auth0/node-auth0/pull/953) ([frederikprijck](https://github.com/frederikprijck))

## [v4.0.1](https://github.com/auth0/node-auth0/tree/v4.0.1) (2023-09-15)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v4.0.0...v4.0.1)

**Fixed**

- Ensure to pass-trough options to TokenProvider [\#938](https://github.com/auth0/node-auth0/pull/938) ([frederikprijck](https://github.com/frederikprijck))

## [v4.0.0](https://github.com/auth0/node-auth0/tree/v4.0.0) (2023-09-14)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v3.7.1...v4.0.0)

This release brings a variety of exciting new features and improvements, including:

- Rewritten from the ground up in TypeScript
- Types for methods, request parameters, bodies, errors and responses
- Customisable modern networking stack

This release also drops support for Node <18. See the [Migration Guide](https://github.com/auth0/node-auth0/blob/master/v4_MIGRATION_GUIDE.md) for more information.

## [v4.0.0-beta.10](https://github.com/auth0/node-auth0/tree/v4.0.0-beta.10) (2023-09-12)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v4.0.0-beta.9...v4.0.0-beta.10)

**Fixed**

- [SDK-4548] Support optional responses [\#928](https://github.com/auth0/node-auth0/pull/928) ([adamjmcgrath](https://github.com/adamjmcgrath))
- mark user_id as required for grants.deleteByUserId [\#930](https://github.com/auth0/node-auth0/pull/930) ([frederikprijck](https://github.com/frederikprijck))
- add fields and include_fields to organization.getMembers [\#929](https://github.com/auth0/node-auth0/pull/929) ([frederikprijck](https://github.com/frederikprijck))
- add pagination overloads to `client.getAll()` [\#931](https://github.com/auth0/node-auth0/pull/931) ([frederikprijck](https://github.com/frederikprijck))

## [v3.7.1](https://github.com/auth0/node-auth0/tree/v3.7.1) (2023-09-11)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v3.7.0...v3.7.1)

**Fixed**

- fix: ManagementTokenProvider should also respect the keepAlive config option [\#927](https://github.com/auth0/node-auth0/pull/927) ([alaczi](https://github.com/alaczi))

## [v4.0.0-beta.9](https://github.com/auth0/node-auth0/tree/v4.0.0-beta.9) (2023-09-06)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v4.0.0-beta.8...v4.0.0-beta.9)

**⚠️ BREAKING CHANGES**

- Rename fetch option, add request examples [\#923](https://github.com/auth0/node-auth0/pull/923) ([adamjmcgrath](https://github.com/adamjmcgrath))
- Change client id params to client_id [\#924](https://github.com/auth0/node-auth0/pull/924) ([adamjmcgrath](https://github.com/adamjmcgrath))

**Fixed**

- Avoid optional properties on responses where possible [\#921](https://github.com/auth0/node-auth0/pull/921) ([frederikprijck](https://github.com/frederikprijck))

## [v3.7.0](https://github.com/auth0/node-auth0/tree/v3.7.0) (2023-08-29)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v3.6.0...v3.7.0)

**Added**

- feat: add configuration for using persistent connections [\#919](https://github.com/auth0/node-auth0/pull/919) ([alaczi](https://github.com/alaczi))

## [v3.6.1](https://github.com/auth0/node-auth0/tree/v3.6.1) (2023-08-22)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v3.6.0...v3.6.1)

**Changed**

- Support providing Organization when resetting password [\#892](https://github.com/auth0/node-auth0/pull/892) ([frederikprijck](https://github.com/frederikprijck))

## [v4.0.0-beta.8](https://github.com/auth0/node-auth0/tree/v4.0.0-beta.8) (2023-08-22)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v4.0.0-beta.7...v4.0.0-beta.8)

**Fixed**

- Update AttackProtection response and general types [\#911](https://github.com/auth0/node-auth0/pull/911) ([frederikprijck](https://github.com/frederikprijck))
- Fix default condition should be the last one [\#915](https://github.com/auth0/node-auth0/pull/915) ([frederikprijck](https://github.com/frederikprijck))
- Fix trigger_id types for actions [\#914](https://github.com/auth0/node-auth0/pull/914) ([frederikprijck](https://github.com/frederikprijck))

## [v4.0.0-beta.7](https://github.com/auth0/node-auth0/tree/v4.0.0-beta.7) (2023-08-16)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v4.0.0-beta.6...v4.0.0-beta.7)

**⚠️ BREAKING CHANGES**

- [SDK-4485] Use native fetch, drop Node 16 support [\#906](https://github.com/auth0/node-auth0/pull/906) ([adamjmcgrath](https://github.com/adamjmcgrath))
- Do not expose a grant method [\#904](https://github.com/auth0/node-auth0/pull/904) ([frederikprijck](https://github.com/frederikprijck))
- Only allow confidential clients [\#905](https://github.com/auth0/node-auth0/pull/905) ([frederikprijck](https://github.com/frederikprijck))

**Added**

- Support providing Organization when resetting password [\#893](https://github.com/auth0/node-auth0/pull/893) ([frederikprijck](https://github.com/frederikprijck))

**Fixed**

- Improve ESM and CJS support [\#902](https://github.com/auth0/node-auth0/pull/902) ([frederikprijck](https://github.com/frederikprijck))

## [v4.0.0-beta.6](https://github.com/auth0/node-auth0/tree/v4.0.0-beta.6) (2023-07-19)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v4.0.0-beta.5...v4.0.0-beta.6)

**Changed**

- Update managers [\#883](https://github.com/auth0/node-auth0/pull/883) ([frederikprijck](https://github.com/frederikprijck))
- Handle duplicate user sign up [\#886](https://github.com/auth0/node-auth0/pull/886) ([frederikprijck](https://github.com/frederikprijck))

**Added**

- Support Organization Name [\#885](https://github.com/auth0/node-auth0/pull/885) ([frederikprijck](https://github.com/frederikprijck))
- Add support for userinfo endpoint [\#872](https://github.com/auth0/node-auth0/pull/872) ([frederikprijck](https://github.com/frederikprijck))
- Support custom parameters with Authorization Code and Refresh Token Grants [\#889](https://github.com/auth0/node-auth0/pull/889) ([frederikprijck](https://github.com/frederikprijck))

## [v3.6.0](https://github.com/auth0/node-auth0/tree/v3.6.0) (2023-07-18)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v3.5.0...v3.6.0)

**Added**

- Support Organization Name [\#884](https://github.com/auth0/node-auth0/pull/884) ([frederikprijck](https://github.com/frederikprijck))

**Changed**

- Do not lowercase org_name claim [\#887](https://github.com/auth0/node-auth0/pull/887) ([frederikprijck](https://github.com/frederikprijck))

## [v4.0.0-beta.5](https://github.com/auth0/node-auth0/tree/v4.0.0-beta.5) (2023-06-28)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v4.0.0-beta.4...v4.0.0-beta.5)

**Fixed**

- Fix issue with TS rewriting fetch dynamic imports [\#878](https://github.com/auth0/node-auth0/pull/878) ([adamjmcgrath](https://github.com/adamjmcgrath))

## [v4.0.0-beta.4](https://github.com/auth0/node-auth0/tree/v4.0.0-beta.4) (2023-06-28)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v4.0.0-beta.3...v4.0.0-beta.4)

**Added**

- Upgrade to fetch 3 [\#876](https://github.com/auth0/node-auth0/pull/876) ([adamjmcgrath](https://github.com/adamjmcgrath))

## [v3.5.0](https://github.com/auth0/node-auth0/tree/v3.5.0) (2023-06-26)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v3.4.0...v3.5.0)

**Added**

- Add option to pass x-request-language header for passwordless [\#873](https://github.com/auth0/node-auth0/pull/873) ([adamjmcgrath](https://github.com/adamjmcgrath))

## [v4.0.0-beta.3](https://github.com/auth0/node-auth0/tree/v4.0.0-beta.3) (2023-05-19)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v4.0.0-beta.2...v4.0.0-beta.3)

**Fixed**

- Fix void responses in Beta types [\#864](https://github.com/auth0/node-auth0/pull/864) ([adamjmcgrath](https://github.com/adamjmcgrath))
- Fix: add missing endpoint and model properties [\#866](https://github.com/auth0/node-auth0/pull/866) ([frederikprijck](https://github.com/frederikprijck))

## [v4.0.0-beta.2](https://github.com/auth0/node-auth0/tree/v4.0.0-beta.2) (2023-05-18)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v4.0.0-beta.1...v4.0.0-beta.2)

**Fixed**

- Fix types exports [\#860](https://github.com/auth0/node-auth0/pull/860) ([adamjmcgrath](https://github.com/adamjmcgrath))

## [v4.0.0-beta.1](https://github.com/auth0/node-auth0/tree/v4.0.0-beta.1) (2023-05-15)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v3.4.0...v4.0.0-beta.1)

- Rewritten from the ground up in TypeScript
- Full TypeScript coverage of methods, request paramters, bodies, errors and responses
- Customisable modern networking stack

## [v3.4.0](https://github.com/auth0/node-auth0/tree/v3.4.0) (2023-05-05)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v3.3.0...v3.4.0)

**Added**

- feat: allow to pass a method as token [\#793](https://github.com/auth0/node-auth0/pull/793) ([KillianHmyd](https://github.com/KillianHmyd))

**Fixed**

- Fix ESM [\#828](https://github.com/auth0/node-auth0/pull/828) ([adamjmcgrath](https://github.com/adamjmcgrath))

## [v3.3.0](https://github.com/auth0/node-auth0/tree/v3.3.0) (2023-03-14)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v3.2.0...v3.3.0)

**Added**

- [SDK-4013] Add API2 Factor Management Endpoints [\#791](https://github.com/auth0/node-auth0/pull/791) ([adamjmcgrath](https://github.com/adamjmcgrath))
- ESM support [\#784](https://github.com/auth0/node-auth0/pull/784) ([btakita](https://github.com/btakita))

## [v3.2.0](https://github.com/auth0/node-auth0/tree/v3.2.0) (2023-02-09)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v3.1.2...v3.2.0)

**Added**

- Add DELETE /api/v2/users/{id}/authenticators [\#785](https://github.com/auth0/node-auth0/pull/785) ([adamjmcgrath](https://github.com/adamjmcgrath))

## [v3.1.2](https://github.com/auth0/node-auth0/tree/v3.1.2) (2023-01-25)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v3.1.1...v3.1.2)

**Fixed**

- Add support for proxy in AuthenticationClient [\#779](https://github.com/auth0/node-auth0/pull/779) ([frederikprijck](https://github.com/frederikprijck))

## [v3.1.1](https://github.com/auth0/node-auth0/tree/v3.1.1) (2023-01-12)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v3.1.0...v3.1.1)

**Fixed**

- bump-jwks-rsa [\#776](https://github.com/auth0/node-auth0/pull/776) ([adamjmcgrath](https://github.com/adamjmcgrath))

## [v3.1.0](https://github.com/auth0/node-auth0/tree/v3.1.0) (2023-01-12)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v3.0.1...v3.1.0)

**Added**

- [SDK-3868] Add support for managing client credentials [\#774](https://github.com/auth0/node-auth0/pull/774) ([adamjmcgrath](https://github.com/adamjmcgrath))
- [SDK-3856] Add `client_assertion` to authenticate clients [\#761](https://github.com/auth0/node-auth0/pull/761) ([adamjmcgrath](https://github.com/adamjmcgrath))

## [v3.0.1](https://github.com/auth0/node-auth0/tree/v3.0.1) (2022-12-22)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v3.0.0...v3.0.1)

**Fixed**

- bump jwks-rsa [\#769](https://github.com/auth0/node-auth0/pull/769) ([adamjmcgrath](https://github.com/adamjmcgrath))

## [v3.0.0](https://github.com/auth0/node-auth0/tree/v3.0.0) (2022-12-22)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v2.44.1...v3.0.0)

**⚠️ BREAKING CHANGES**

- Update jsonwebtoken [\#766](https://github.com/auth0/node-auth0/pull/766) ([adamjmcgrath](https://github.com/adamjmcgrath))

This release drops support for Node versions <14.

## [v2.44.1](https://github.com/auth0/node-auth0/tree/v2.44.1) (2022-12-09)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v2.44.0...v2.44.1)

**Fixed**

- Prevent calling the callback more than once [\#759](https://github.com/auth0/node-auth0/pull/759) ([snocorp](https://github.com/snocorp))

## [v2.44.0](https://github.com/auth0/node-auth0/tree/v2.44.0) (2022-10-11)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v2.43.0...v2.44.0)

**Added**

- [SDK-3653] Add proxy support to Management Client [\#747](https://github.com/auth0/node-auth0/pull/747) ([adamjmcgrath](https://github.com/adamjmcgrath))

## [v2.43.0](https://github.com/auth0/node-auth0/tree/v2.43.0) (2022-10-10)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v2.42.0...v2.43.0)

**Added**

- Add option to include response headers in the result [\#744](https://github.com/auth0/node-auth0/pull/744) ([adamjmcgrath](https://github.com/adamjmcgrath))

## [v2.42.0](https://github.com/auth0/node-auth0/tree/v2.42.0) (2022-05-23)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v2.41.0...v2.42.0)

**Added**

- chore: add branding theme routes [\#725](https://github.com/auth0/node-auth0/pull/725) ([alejofernandez](https://github.com/alejofernandez))

## [v2.41.0](https://github.com/auth0/node-auth0/tree/v2.41.0) (2022-05-20)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v2.40.0...v2.41.0)

**Added**

- Added ClientsManager.rotateClientSecret method [\#721](https://github.com/auth0/node-auth0/pull/721) ([sbmelvin](https://github.com/sbmelvin))

## [v2.40.0](https://github.com/auth0/node-auth0/tree/v2.40.0) (2022-02-11)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v2.39.0...v2.40.0)

**Added**

- [CAUTH-1270]: feat(attack protection): add three features (bf, sipt, bpd) [\#705](https://github.com/auth0/node-auth0/pull/705) ([sdwvit](https://github.com/sdwvit))

## [v2.39.0](https://github.com/auth0/node-auth0/tree/v2.39.0) (2022-01-31)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v2.38.1...v2.39.0)

**Added**

- feat: update draft deploy [\#702](https://github.com/auth0/node-auth0/pull/702) ([TwelveNights](https://github.com/TwelveNights))

## [v2.38.1](https://github.com/auth0/node-auth0/tree/v2.38.1) (2022-01-27)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v2.38.0...v2.38.1)

**Fixed**

- Fix wrong property in `assignRolestoUser` [\#700](https://github.com/auth0/node-auth0/pull/700) ([adamjmcgrath](https://github.com/adamjmcgrath))
- signIn method should provide using audience prop in userData [\#699](https://github.com/auth0/node-auth0/pull/699) ([maxism](https://github.com/maxism))

## [v2.38.0](https://github.com/auth0/node-auth0/tree/v2.38.0) (2022-01-26)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v2.37.0...v2.38.0)

**Changed**

- refactor to es6 syntax with classes [\#665](https://github.com/auth0/node-auth0/pull/665) ([hornta](https://github.com/hornta))

**Fixed**

- [SDK-3030] Wrong url when doing assign users with a callback [\#686](https://github.com/auth0/node-auth0/pull/686) ([adamjmcgrath](https://github.com/adamjmcgrath))

## [v2.37.0](https://github.com/auth0/node-auth0/tree/v2.37.0) (2021-10-14)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v2.36.2...v2.37.0)

**Added**

- Add support for checking connection status [\#662](https://github.com/auth0/node-auth0/pull/662) ([frederikprijck](https://github.com/frederikprijck))

**Fixed**

- Fix undefined tokenProvider when access token is provided. [\#642](https://github.com/auth0/node-auth0/pull/642) ([Gilighost](https://github.com/Gilighost))

## [v2.36.2](https://github.com/auth0/node-auth0/tree/v2.36.2) (2021-09-20)

[Full Changelog](https://github.com/auth0/node-auth0/compare/v2.36.1...v2.36.2)

**Security**

- [Snyk] Security upgrade rest-facade from 1.13.0 to 1.13.1 [\#653](https://github.com/auth0/node-auth0/pull/653) ([snyk-bot](https://github.com/snyk-bot))
- [Snyk] Security upgrade axios from 0.21.1 to 0.21.3 [\#649](https://github.com/auth0/node-auth0/pull/649) ([snyk-bot](https://github.com/snyk-bot))

## [v2.36.1](https://github.com/auth0/node-auth0/tree/v2.36.1) (2021-07-28)

**Fixed**

- Fix docs for rate limit default maxRetries [\#640](https://github.com/auth0/node-auth0/pull/640) ([jimmyjames](https://github.com/jimmyjames))
- Fix updateCustomTextByLanguage [\#638](https://github.com/auth0/node-auth0/pull/638) ([davidpatrick](https://github.com/davidpatrick))

[Full Changelog](https://github.com/auth0/node-auth0/compare/v2.36.0...v2.36.1)

## [v2.36.0](https://github.com/auth0/node-auth0/tree/v2.36.0) (2021-07-23)

**Added**

- [SDK-2666] Update endpoint methods to document allowance of 'from' and 'take' checkpoint pagination parameters [\#634](https://github.com/auth0/node-auth0/pull/634) ([evansims](https://github.com/evansims))

[Full Changelog](https://github.com/auth0/node-auth0/compare/v2.35.1...v2.36.0)

## [v2.35.1](https://github.com/auth0/node-auth0/tree/v2.35.1) (2021-06-21)

**Fixed**

- Update `setUniversalLoginTemplate` example to correctly reflect documentation [\#624](https://github.com/auth0/node-auth0/pull/624) ([mendhak](https://github.com/mendhak))
- Use id instead of action_id as per the mgmt api. [\#622](https://github.com/auth0/node-auth0/pull/622) ([stevezau](https://github.com/stevezau))

[Full Changelog](https://github.com/auth0/node-auth0/compare/v2.35.0...v2.35.1)

## [v2.35.0](https://github.com/auth0/node-auth0/tree/v2.35.0) (2021-05-17)

**Added**

- Add method to verify OTP received via email [\#620](https://github.com/auth0/node-auth0/pull/620) ([alexesprit](https://github.com/alexesprit))
- [actionsManager] Adding new Actions Managment APIs [\#570](https://github.com/auth0/node-auth0/pull/570) ([shushen](https://github.com/shushen))

[Full Changelog](https://github.com/auth0/node-auth0/compare/v2.34.2...v2.35.0)

## [v2.34.2](https://github.com/auth0/node-auth0/tree/v2.34.2) (2021-04-12)

**Fixed**

- [SDK-2484] Encode user ids on patch/update/delete [\#608](https://github.com/auth0/node-auth0/pull/608) ([davidpatrick](https://github.com/davidpatrick))

[Full Changelog](https://github.com/auth0/node-auth0/compare/v2.34.1...v2.34.2)

## [v2.34.1](https://github.com/auth0/node-auth0/tree/v2.34.1) (2021-04-01)

**Fixed**

- Small fix to ManagementTokenProvider Cache [\#604](https://github.com/auth0/node-auth0/pull/604) ([davidpatrick](https://github.com/davidpatrick))

**Security**

- Bump y18n from 4.0.0 to 4.0.1 [\#602](https://github.com/auth0/node-auth0/pull/602) ([dependabot-preview](https://github.com/dependabot-preview))
- Security upgrade jwks-rsa from 1.10.0 to 1.12.1 [\#601](https://github.com/auth0/node-auth0/pull/601) ([snyk-bot](https://github.com/snyk-bot))

## [v2.34.0](https://github.com/auth0/node-auth0/tree/v2.34.0) (2021-03-24)

**Added**

- feat(orgs): Support Organization feature [\#592](https://github.com/auth0/node-auth0/pull/592) ([mcastany](https://github.com/mcastany))
- Org idtoken validation support [\#597](https://github.com/auth0/node-auth0/pull/597) ([davidpatrick](https://github.com/davidpatrick))
- Allow passwordless SMS code verification to use token endpoint [\#591](https://github.com/auth0/node-auth0/pull/591) ([jimmyjames](https://github.com/jimmyjames))

**Changed**

- Doc Updates [\#599](https://github.com/auth0/node-auth0/pull/599) ([davidpatrick](https://github.com/davidpatrick))
- Update get role users docs [\#587](https://github.com/auth0/node-auth0/pull/587) ([jhiner](https://github.com/jhiner))
- revokeRefreshToken method is missing in docs [\#584](https://github.com/auth0/node-auth0/issues/584)

**Security**

- [Security] Bump elliptic from 6.5.3 to 6.5.4 [\#589](https://github.com/auth0/node-auth0/pull/589) ([dependabot-preview[bot]](https://github.com/apps/dependabot-preview))

[Full Changelog](https://github.com/auth0/node-auth0/compare/v2.33.0...v2.34.0)

## [v2.33.0](https://github.com/auth0/node-auth0/tree/v2.33.0) (2021-02-05)

**Added**

- feat: add revokeRefreshToken [\#579](https://github.com/auth0/node-auth0/pull/579) ([andreafspeziale](https://github.com/andreafspeziale))
- ULP-2609/ULP-2914: add page templates support to /branding [\#574](https://github.com/auth0/node-auth0/pull/574) ([sebadoom](https://github.com/sebadoom))

[Full Changelog](https://github.com/auth0/node-auth0/compare/v2.32.0...v2.33.0)

## [v2.32.0](https://github.com/auth0/node-auth0/tree/v2.32.0) (2021-01-21)

**Added**

- Additional options on getByEmail [SDK-2268][\#577](https://github.com/auth0/node-auth0/pull/577) ([davidpatrick](https://github.com/davidpatrick))
- [SDK-2261] Add forwardFor support to passwordless calls [\#576](https://github.com/auth0/node-auth0/pull/576) ([frederikprijck](https://github.com/frederikprijck))
- Adding Support for Guardian factor settings endpoints [\#569](https://github.com/auth0/node-auth0/pull/569) ([JayHelton](https://github.com/JayHelton))

[Full Changelog](https://github.com/auth0/node-auth0/compare/v2.31.1...v2.32.0)

## [v2.31.1](https://github.com/auth0/node-auth0/tree/v2.31.1) (2021-01-05)

**Fixed**

- Expose getJobErrors to management client [\#563](https://github.com/auth0/node-auth0/pull/563) ([davidaubin19](https://github.com/davidaubin19))
- Fix passing a custom User-Agent to Axios. [\#562](https://github.com/auth0/node-auth0/pull/562) ([djanowski](https://github.com/djanowski))
- Expose assignUsersToRole to ManagementClient [\#561](https://github.com/auth0/node-auth0/pull/561) ([davidaubin19](https://github.com/davidaubin19))

**Security**

- [Security] Bump axios from 0.19.2 to 0.21.1 [\#565](https://github.com/auth0/node-auth0/pull/565) ([dependabot-preview[bot]](https://github.com/apps/dependabot-preview))

[Full Changelog](https://github.com/auth0/node-auth0/compare/v2.31.0...v2.31.1)

## [v2.31.0](https://github.com/auth0/node-auth0/tree/v2.31.0) (2020-12-08)

**Added**

- Updated documentation on Link Users [\#558](https://github.com/auth0/node-auth0/pull/558) ([davidpatrick](https://github.com/davidpatrick))
- Add support for new passwordless endpoint [\#556](https://github.com/auth0/node-auth0/pull/556) ([nbandarchi](https://github.com/nbandarchi))

**Fixed**

- Adds importUsersJob to ManagementClient [\#553](https://github.com/auth0/node-auth0/pull/553) ([mikemeerschaert](https://github.com/mikemeerschaert))

[Full Changelog](https://github.com/auth0/node-auth0/compare/v2.30.0...v2.31.0)

## [v2.30.0](https://github.com/auth0/node-auth0/tree/v2.30.0) (2020-10-22)

**Added**

- Provide headers on mgmt token fetch [\#543](https://github.com/auth0/node-auth0/pull/543) ([davidpatrick](https://github.com/davidpatrick))

**Changed**

- [SDK-1975] Use exponential backoff rather than rate limit headers [\#538](https://github.com/auth0/node-auth0/pull/538) ([adamjmcgrath](https://github.com/adamjmcgrath))

**Fixed**

- Bumps Rest-Facade Dependencies [\#542](https://github.com/auth0/node-auth0/pull/542) ([davidpatrick](https://github.com/davidpatrick))
- Fix deprecation warning in importUserJobs [\#537](https://github.com/auth0/node-auth0/pull/537) ([JCQuintas](https://github.com/JCQuintas))

[Full Changelog](https://github.com/auth0/node-auth0/compare/v2.29.0...v2.30.0)

## [v2.29.0](https://github.com/auth0/node-auth0/tree/v2.29.0) (2020-09-23)

**Added**

- Adding support for prompts and custom texts [\#533](https://github.com/auth0/node-auth0/pull/533) ([davidpatrick](https://github.com/davidpatrick))
- Adding call to invalidate all remembered browsers. [\#528](https://github.com/auth0/node-auth0/pull/528) ([tandrup](https://github.com/tandrup))
- Adding docs for secondary and federated identity email verification [\#519](https://github.com/auth0/node-auth0/pull/519) ([jimmyjames](https://github.com/jimmyjames))

**Changed**

- Update dependencies [\#535](https://github.com/auth0/node-auth0/pull/535) ([davidpatrick](https://github.com/davidpatrick))
- Update jwks-rsa dependency to avoid DeprecationWarning Buffer() [\#534](https://github.com/auth0/node-auth0/pull/534) ([jalie](https://github.com/jalie))

**Security**

- [Security] Bump node-fetch from 2.6.0 to 2.6.1 [\#532](https://github.com/auth0/node-auth0/pull/532) ([dependabot-preview[bot]](https://github.com/apps/dependabot-preview))

[Full Changelog](https://github.com/auth0/node-auth0/compare/v2.28.0...v2.29.0)

## [v2.28.0](https://github.com/auth0/node-auth0/tree/v2.28.0) (2020-08-27)

**Added**

- Added support for Log Streams [\#518](https://github.com/auth0/node-auth0/pull/518) ([cv711](https://github.com/cv711))

**Removed**

- Remove bluebird [\#520](https://github.com/auth0/node-auth0/pull/520) ([mattiasnixell](https://github.com/mattiasnixell))

**Security**

- [Security] Bump elliptic from 6.5.2 to 6.5.3 [\#521](https://github.com/auth0/node-auth0/pull/521) ([dependabot-preview[bot]](https://github.com/apps/dependabot-preview))

[Full Changelog](https://github.com/auth0/node-auth0/compare/v2.27.1...v2.28.0)

## [v2.27.1](https://github.com/auth0/node-auth0/tree/v2.27.1) (2020-07-23)

**Changed**

- Use [REDACTED] instead of [SANITIZED] when cleaning errors [\#515](https://github.com/auth0/node-auth0/pull/515) ([jimmyjames](https://github.com/jimmyjames))

**Security**

- Sanitize Headers on Errors [\#507](https://github.com/auth0/node-auth0/pull/507) ([jimmyjames](https://github.com/jimmyjames))
- Bump lodash from 4.17.15 to 4.17.19 [\#506](https://github.com/auth0/node-auth0/pull/506) ([dependabot[bot]](https://github.com/apps/dependabot))

[Full Changelog](https://github.com/auth0/node-auth0/compare/v2.27.0...v2.27.1)

## [v2.27.0](https://github.com/auth0/node-auth0/tree/v2.27.0) (2020-06-30)

**Added**

- feat(migrations): adds migrations manager [\#503](https://github.com/auth0/node-auth0/pull/503) ([CriGoT](https://github.com/CriGoT))
- Added deleteUserByEmail to ConnectionsManager [\#502](https://github.com/auth0/node-auth0/pull/502) ([MatthewBacalakis](https://github.com/MatthewBacalakis))
- feat(guardian): support policies, selected-provider, message-types methods [MFA-310][\#501](https://github.com/auth0/node-auth0/pull/501) ([pmalouin](https://github.com/pmalouin))

**Fixed**

- fix: management methods throwing error on access [\#500](https://github.com/auth0/node-auth0/pull/500) ([pmalouin](https://github.com/pmalouin))
- fix: guardian-related code examples [\#499](https://github.com/auth0/node-auth0/pull/499) ([pmalouin](https://github.com/pmalouin))

[Full Changelog](https://github.com/auth0/node-auth0/compare/v2.26.0...v2.27.0)

## [v2.26.0](https://github.com/auth0/node-auth0/tree/v2.26.0) (2020-06-05)

**Added**

- JobsManager handling importUsers response payload [\#492](https://github.com/auth0/node-auth0/pull/492) ([davidpatrick](https://github.com/davidpatrick))

**Deprecated**

- Deprecate importUsers in favor of importUsersJob [\#494](https://github.com/auth0/node-auth0/pull/494) ([davidpatrick](https://github.com/davidpatrick))

**Fixed**

- Bump codecov - npm audit fix [\#495](https://github.com/auth0/node-auth0/pull/495) ([davidpatrick](https://github.com/davidpatrick))

**Security**

- Fixes dependency vulnerabilities from webpack [\#498](https://github.com/auth0/node-auth0/pull/498) ([davidpatrick](https://github.com/davidpatrick))

[Full Changelog](https://github.com/auth0/node-auth0/compare/v2.25.1...v2.26.0)

## [v2.25.1](https://github.com/auth0/node-auth0/tree/v2.25.1) (2020-05-03)

**Fixed**

- Return response.data where Axios is used [\#484](https://github.com/auth0/node-auth0/pull/484) ([taylorbryant](https://github.com/taylorbryant))

[Full Changelog](https://github.com/auth0/node-auth0/compare/v2.25.0...v2.25.1)

## [v2.25.0](https://github.com/auth0/node-auth0/tree/v2.25.0) (2020-04-29)

**Changed**

- Deprecate Request lib [\#475](https://github.com/auth0/node-auth0/pull/475) ([davidpatrick](https://github.com/davidpatrick))

**Fixed**

- Fix typos [\#480](https://github.com/auth0/node-auth0/pull/480) ([pgrimaud](https://github.com/pgrimaud))
- Update getRulesConfigs docs to include callback [\#473](https://github.com/auth0/node-auth0/pull/473) ([akvamalin](https://github.com/akvamalin))

**Security**

- Dependency bump [\#481](https://github.com/auth0/node-auth0/pull/481) ([davidpatrick](https://github.com/davidpatrick))
- [Security] Bump acorn from 6.2.1 to 6.4.1 [\#471](https://github.com/auth0/node-auth0/pull/471) ([dependabot-preview[bot]](https://github.com/apps/dependabot-preview))

[Full Changelog](https://github.com/auth0/node-auth0/compare/v2.24.0...v2.25.0)

## [v2.24.0](https://github.com/auth0/node-auth0/tree/v2.24.0) (2020-03-06)

**Fixed**

- Update and fix JSDocs related to JobsManager [\#469](https://github.com/auth0/node-auth0/pull/469) ([orangain](https://github.com/orangain))
- Fixes test on supportedAlgorithms [\#466](https://github.com/auth0/node-auth0/pull/466) ([davidpatrick](https://github.com/davidpatrick))
- Fixes calls on passwordless endpoints [\#465](https://github.com/auth0/node-auth0/pull/465) ([davidpatrick](https://github.com/davidpatrick))

[Full Changelog](https://github.com/auth0/node-auth0/compare/v2.23.0...v2.24.0)

## [v2.23.0](https://github.com/auth0/node-auth0/tree/v2.23.0) (2020-02-21)

**Added**

- [DXEX-455] Allow custom headers to be set in Management/Auth Clients. [\#460](https://github.com/auth0/node-auth0/pull/460) ([seejee](https://github.com/seejee))

**Changed**

- Updates node-jwks-rsa [\#461](https://github.com/auth0/node-auth0/pull/461) ([davidpatrick](https://github.com/davidpatrick))

**Fixed**

- Update lru-memoizer dependency to avoid DeprecationWarning Buffer() [\#459](https://github.com/auth0/node-auth0/pull/459) ([jalie](https://github.com/jalie))
- getUsersInRole Docs [\#457](https://github.com/auth0/node-auth0/pull/457) ([davidpatrick](https://github.com/davidpatrick))

**Security**

- [Security] Bump codecov from 3.5.0 to 3.6.5 [\#462](https://github.com/auth0/node-auth0/pull/462) ([dependabot-preview[bot]](https://github.com/apps/dependabot-preview))

[Full Changelog](https://github.com/auth0/node-auth0/compare/v2.22.0...v2.23.0)

## [v2.22.0](https://github.com/auth0/node-auth0/tree/v2.22.0) (2020-01-24)

**Added**

- Support for Hooks API [\#440](https://github.com/auth0/node-auth0/pull/440) ([astanciu](https://github.com/astanciu))

[Full Changelog](https://github.com/auth0/node-auth0/compare/v2.21.0...v2.22.0)

## [v2.21.0](https://github.com/auth0/node-auth0/tree/v2.21.0) (2020-01-15)

**Added**

- Improved OIDC compliance [\#446](https://github.com/auth0/node-auth0/pull/446) ([davidpatrick](https://github.com/davidpatrick))

**Changed**

- Add client secret to refreshToken and remove ID token validation [\#433](https://github.com/auth0/node-auth0/pull/433) ([joshcanhelp](https://github.com/joshcanhelp))

**Security**

- [Security] Bump handlebars from 4.1.2 to 4.5.3 [\#441](https://github.com/auth0/node-auth0/pull/441) ([dependabot-preview[bot]](https://github.com/apps/dependabot-preview))
- Update rest-facade dependency [\#436](https://github.com/auth0/node-auth0/pull/436) ([joshcanhelp](https://github.com/joshcanhelp))

[Full Changelog](https://github.com/auth0/node-auth0/compare/v2.20.0...v2.21.0)

## [v2.20.0](https://github.com/auth0/node-auth0/tree/v2.20.0) (2019-09-17)

**Added**

- expose createEmailTemplate, getEmailTemplate, updateEmailTemplates vi… [\#416](https://github.com/auth0/node-auth0/pull/416) ([rameshanandakrishnan](https://github.com/rameshanandakrishnan))

**Security**

- Sanitize Error Request Data [\#424](https://github.com/auth0/node-auth0/pull/424) ([davidpatrick](https://github.com/davidpatrick))
- [Security] Bump mixin-deep from 1.3.1 to 1.3.2 [\#421](https://github.com/auth0/node-auth0/pull/421) ([dependabot-preview[bot]](https://github.com/apps/dependabot-preview))

[Full Changelog](https://github.com/auth0/node-auth0/compare/v2.19.0...v2.20.0)

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
