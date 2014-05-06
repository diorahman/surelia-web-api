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

Surelia.prototype.listMailboxes = function * (){
  yield handle.get (this, "listMailboxes", {});
}

Surelia.prototype.ListEmails = function * (){
  yield handle.get (this, "listEmails", {});
}

Surelia.prototype.readEmail = function * (){
  yield handle.get (this, "readEmail", {});
}

Surelia.prototype.markRead = function * (){
  yield handle.put (this, "markRead", {});
}

Surelia.prototype.markUnread = function * (){
  yield handle.del (this, "markUnread", {});
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

Surelia.prototype.sendEmail = function * (){
  yield handle.post (this, "sendEmail", {});
}
