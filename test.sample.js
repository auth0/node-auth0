const ManagementClient = require('./src/index').ManagementClient;

process.env.WEBTASK_API_TOKEN = '<webtask_api>';
process.env.WEBTASK_API_URL = 'https://sandbox8-us.it.auth0.com';

var management = new ManagementClient({
  token: '<management api token>',
  domain: '<some_domain>'
});

const hook_temlate = `/**
@param {object} client - information about the client
@param {string} client.name - name of client
@param {string} client.id - client id
@param {string} client.tenant - Auth0 tenant name
@param {object} client.metadata - client metadata
@param {array|undefined} scope - array of strings representing the scope claim or undefined
@param {string} audience - token's audience claim
@param {object} context - additional authorization context
@param {object} context.webtask - webtask context
@param {function} cb - function (error, accessTokenClaims)
*/
module.exports = function(client, scope, audience, context, cb) {
  var access_token = {};
  access_token.scope = scope;

  // Modify scopes or add extra claims
  // access_token['https://example.com/claim'] = 'bar';
  // access_token.scope.push('extra');

  cb(null, access_token);
};
`;
function createHook() {
  management.hooks
    .create({
      triggerId: 'post-user-registration',
      name: 'post-user-reg', // Also testing that kebab casing works
      active: true,
      code: hook_temlate,
      secrets: {
        'api-key': 'my custom api key'
      },
      dependencies: {
        bcrypt: '3.0.6'
      }
    })
    .then(hook => {
      console.log('hook created');
      console.log(hook);
      return updateHook(hook.id, hook);
    })
    .catch(err => {
      console.error(err);
    });
}
function updateHook(id, hook) {
  hook.name = 'new name';
  return management.hooks
    .update({ id }, hook)
    .then(hook => {
      console.log('hook updated');
      console.log(hook);
      return getHook(hook.id);
    })
    .catch(err => {
      console.error(err);
    });
}

function getHook(id) {
  return management.hooks
    .get({ id })
    .then(hook => {
      console.log('hook retreived');
      console.log(hook);
      return deleteHook(hook.id);
    })
    .catch(err => {
      console.error(err);
    });
}
function deleteHook(id) {
  console.log('deleting hook');
  return management.hooks
    .delete({ id })
    .then(() => {
      console.log('hook deleted');
    })
    .catch(err => {
      console.error(err);
    });
}

function getAllHooks() {
  return management.hooks
    .getAll({})
    .then(hook => {
      console.log('hook retreived');
      console.log(hook);
    })
    .catch(err => {
      console.error(err);
    });
}

createHook();
//getAllHooks();
