var util = require('util');


var ArgumentError = function(message){
  this.message = message;
};

util.inherits(ArgumentError, Error);


module.exports = ArgumentError;
