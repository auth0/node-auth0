var AppMetadata = require('./appMetadata');

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

module.exports = User;