var helper = require ("panas").helper;
var thunkified = helper.thunkified;
var _ = require ("lodash");
var boom = helper.error;

/**
 * Surelia class
 */
function Surelia (options) {
  if (!(this instanceof Surelia)) return new Surelia(options);
  this.name = "surelia";
}

Surelia.prototype.listMailboxes = function (ctx, options, cb) {
  cb (null, {});
}

Surelia.prototype.listEmails = function (ctx, options, cb) {
  cb (null, {});
}

Surelia.prototype.readEmail = function (ctx, options, cb) {
  cb (null, {});
}

Surelia.prototype.markRead = function (ctx, options, cb) {
  cb (null, {});
}

Surelia.prototype.markUnread = function (ctx, options, cb) {
  cb (null, {});
}

Surelia.prototype.deleteEmail = function (ctx, options, cb) {
  cb (null, {});
}

Surelia.prototype.readEmailRaw = function (ctx, options, cb) {
  cb (null, {});
}

Surelia.prototype.readHeaders = function (ctx, options, cb) {
  cb (null, {});
}

Surelia.prototype.sendEmail = function (ctx, options, cb) {
  cb (null, {});
}

module.exports = thunkified (Surelia());
