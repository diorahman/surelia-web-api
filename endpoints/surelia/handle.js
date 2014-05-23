var helper = require ("panas").helper;
var model = require ("./model");
var handle = helper.Handle (model);

module.exports = Surelia;

/**
 * The Surelia handlers
 */
function Surelia (options) {
  if (!(this instanceof Surelia)) return new Surelia (options);
}

Surelia.prototype.authenticate = function * (){
  yield handle.post (this, "authenticate", {});
}

Surelia.prototype.listMailboxes = function * (){
  yield handle.get (this, "listMailboxes", {});
}

Surelia.prototype.listEmails = function * (){
  yield handle.get (this, "listEmails", {});
}


Surelia.prototype.uploadEmail = function * (){
  yield handle.put (this, "uploadEmail", {});
}

Surelia.prototype.readEmail = function * (){
  yield handle.get (this, "readEmail", {});
}

Surelia.prototype.manageFlag = function * (){
  yield handle.put (this, "manageFlag", {});
}

Surelia.prototype.deleteEmail = function * (){
  yield handle.del (this, "deleteEmail", {});
}

Surelia.prototype.readEmailRaw = function * (){
  yield handle.get (this, "readEmailRaw", {});
}

Surelia.prototype.readHeaders = function * (){
  yield handle.get (this, "readHeaders", {});
}

Surelia.prototype.composeEmail = function * (){
  yield handle.put (this, "composeEmail", {});
}

Surelia.prototype.updateDraftEmail = function * (){
  yield handle.put (this, "updateDraftEmail", {});
}

Surelia.prototype.sendDraftEmail = function * (){
  yield handle.post (this, "sendDraftEmail", {});
}
