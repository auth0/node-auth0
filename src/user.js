var AppMetadata = require('./appMetadata');
var UserMetadata = require('./userMetadata');

function User(client, id){
  this.id = id;
  this.client = client;
}

Object.defineProperty(User.prototype, 'appMetadata', {
  enumerable: true,
  get: function(){
    if (!this.__appMetadata){
      this.__appMetadata = new AppMetadata(this);
    }

    return this.__appMetadata;
  }
});

Object.defineProperty(User.prototype, 'userMetadata', {
  enumerable: true,
  get: function(){
    if (!this.__userMetadata){
      this.__userMetadata = new UserMetadata(this);
    }

    return this.__userMetadata;
  }
});

module.exports = User;