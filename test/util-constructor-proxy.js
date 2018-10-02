// Test utility function to delay class instantiation
module.exports = (ClassObject, ...args) => () => new ClassObject(...args);
