const ManagementClient = require('./src/index').ManagementClient;

var management = new ManagementClient({
  token: '<management api token>',
  domain: 'keystone-test.auth0.com'
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
      triggerId: 'credentials-exchange',
      name: 'cce hook', // Also testing that kebab casing works
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
    })
    .catch(err => {
      console.error(err);
    });
}

function getHook() {
  return management.hooks
    .get('cce-hook')
    .then(hook => {
      console.log('hook retreived');
      console.log(hook);
    })
    .catch(err => {
      console.error(err);
    });
}
function deleteHook() {
  return management.hooks
    .delete('cce-hook')
    .then(() => {
      console.log('hook deleted');
    })
    .catch(err => {
      console.error(err);
    });
}

function getAllHooks() {
  return management.hooks
    .getAll(0, 100)
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
