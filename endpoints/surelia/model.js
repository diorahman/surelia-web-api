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

Surelia.prototype.authenticate = function (ctx, options, cb) {
  console.log("Connecting to IMAP");
  ctx.manager.get({
    server: "imap.gmail.com",
    auth: {
      user: ctx.body.username,
      pass: ctx.body.password
    },
    user: ctx.body.username 
  },function(err, client) {
    console.log("Connected");
    cb(null);
  });
}

Surelia.prototype.listMailboxes = function (ctx, options, cb) {
  console.log(ctx.manager);
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
