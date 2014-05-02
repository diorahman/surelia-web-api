var helper = require ("panas").helper;
var model = require ("./model");
var handle = helper.Handle (model);

module.exports = User;

/**
 * The User handlers
 */
function User (options) {
  if (!(this instanceof User)) return new User (options);
}

User.prototype.find = function * (){
  yield handle.get (this, "find", {});
}

User.prototype.findOne = function * (){
  yield handle.get (this, "findOne", {});
}

User.prototype.update = function * (){
  yield handle.put (this, "update", {});
}

User.prototype.create = function * (){
  yield handle.post (this, "create", {});
}

User.prototype.getActivate = function * (){
  yield handle.get (this, "activate", {});
}

User.prototype.postActivate = function * (){
  yield handle.post (this, "activate", {});
}

User.prototype.authenticate = function * (){
  yield handle.post (this, "authenticate", {});
}
