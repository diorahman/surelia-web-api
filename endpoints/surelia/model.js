var helper = require ("panas").helper;
var boom = helper.error;
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
  var self = this;
  console.log("Connecting to IMAP");
  var user = options.body.user;
  var pass = options.body.pass;
  ctx.imapManager.get({
    server: "imap.gmail.com",
    auth: {
      user: user,
      pass: pass
    },
    user: user 
  },function(err, client) {
    if (err) {
      return cb(err);
    }
    var p = function * (next) {
      this["imapUser"] = user;
      yield next;
    }
    ctx.app.middleware.unshift(p);
    console.log("Connected");
    cb(null, {});
  });
}

Surelia.prototype.getClient = function (ctx, options, cb) {
  var client = ctx.imapManager.connections[ctx.imapUser];
  if (!client) {
    throw (boom.forbidden("Login required"));
  }
  return client;
}

Surelia.prototype.listMailboxes = function (ctx, options, cb) {
  var client = this.getClient(ctx, options, cb);
  var specials = {};
  var specialBoxes = ["Drafts", "Sent", "Spam", "INBOX", "Trash"];

  client.listMailboxes(function(err, mboxes) {
    var total = mboxes.length;
    if (total == 0) {
      return cb(null, { type: "list", data: [], count: 0});
    }

    var getChildren = function(index, cb) {
      console.log(index);
      if (index < 0) return cb();

      var mbox = mboxes[index]; 
      if (mbox.hasChildren) {
        mbox.listChildren(function(err, children) {
          mbox.children = children;
          _.each(children, function(child) {
            _.each(specialBoxes, function(specialBox, index) {
              if (child.type && child.type == specialBox) {
                specials[specialBox] = child.path;
                specialBoxes.splice(index, 1);
              }
            });
          });

          getChildren(index - 1, cb);
        });
      } else {
        getChildren(index - 1, cb);
      }

      _.each(specialBoxes, function(specialBox, index) {
        if (mbox.type && mbox.type == specialBox) {
          specials[specialBox] = mbox.path;
          specialBoxes.splice(index, 1);
        }
      });
    }

    getChildren(total - 1, function() {
      cb (null, {
        type: "object",
         all: mboxes,
        specials : specials 
      });
    });
  });
}

Surelia.prototype.listEmails = function (ctx, options, cb) {
  var client = this.getClient(ctx, options, cb);
  client.openMailbox(ctx.params.id, function(err, mboxInfo) {
    if (err) {
      return cb(err);
    }
    var from = ctx.query.from || 0;
    var limit = ctx.query.limit || 20;
    client.listMessages(from, limit, function(err, mbox) {
      if (err) {
        return cb(err);
      }
      cb (null, {
        type: "list",
         data: mbox,
         count: mbox.length,
         total: mboxInfo.count
      });
    });
  });
}

Surelia.prototype.uploadEmail = function (ctx, options, cb) {
  var client = this.getClient(ctx, options, cb);
  client.openMailbox(ctx.params.id, function(err, mboxInfo) {
    if (err) {
      return cb(err);
    }
    client.storeMessage(options.body.message, function(err, result) {
      if (err) {
        return cb(err);
      }
      cb (null, {
        type: "email",
          data: {
            mailbox: ctx.params.id,
            uid: result.UID,
            uidValidity: result.UIDValidity,
          }
      });
    });
  });



}

Surelia.prototype.readEmail = function (ctx, options, cb) {
  var client = this.getClient(ctx, options, cb);
  client.openMailbox(ctx.params.id, function(err, mboxInfo) {
    if (err) {
      return cb(err);
    }
    var from = ctx.query.from || 0;
    var limit = ctx.query.limit || 20;
    client.fetchData(ctx.params.emailId, function(err, message) {
      if (err) {
        return cb(err);
      }
      cb (null, {
        type: "email",
         data: message
      });
    });
  });
}

Surelia.prototype.manageFlag = function (ctx, options, cb) {
  var client = this.getClient(ctx, options, cb);
  client.openMailbox(ctx.params.id, function(err, mboxInfo) {
    if (err) {
      return cb(err);
    }

    var result = function(err, message) {
      if (err) {
        return cb(err);
      }
      var returnValue = {
        type: "email",
        data: {
          mailbox: ctx.params.id,
          uid: ctx.params.emailId
        }
      };
      if (options.body.unflag) {
        returnValue.data.unflag = options.body.unflag; 
      } else {
        returnValue.data.flag = options.body.flag; 
      }
      cb (null, returnValue);
    }

    if (options.body.unflag) {
      client.removeFlags(ctx.params.emailId, options.body.flag, result);
    } else {
      client.addFlags(ctx.params.emailId, options.body.flag, result);
    }

  });
}

Surelia.prototype.deleteEmail = function (ctx, options, cb) {
  var client = this.getClient(ctx, options, cb);
  client.openMailbox(ctx.params.id, function(err, mboxInfo) {
    if (err) {
      return cb(err);
    }

    client.deleteMessage(ctx.params.emailId, function(err) {
      if (err) {
        return cb(err);
      }

      return cb(null, {});
    });

  });

}

Surelia.prototype.readEmailRaw = function (ctx, options, cb) {
  var client = this.getClient(ctx, options, cb);
  client.openMailbox(ctx.params.id, function(err, mboxInfo) {
    if (err) {
      return cb(err);
    }

    var stream = client.createMessageStream(ctx.params.emailId);
    ctx.type = "text/plain";
    ctx.status = 200;
    cb(null, stream);
  });
}

Surelia.prototype.readHeaders = function (ctx, options, cb) {
  var client = this.getClient(ctx, options, cb);
  client.openMailbox(ctx.params.id, function(err, mboxInfo) {
    if (err) {
      return cb(err);
    }
    client.listMessagesByUID(ctx.params.emailId, ctx.params.emailId, function(err, mbox) {
      if (err) {
        return cb(err);
      }
      cb (null, {
        type: "email-header",
         data: mbox[0]
      });
    });
  });

}

Surelia.prototype.sendEmail = function (ctx, options, cb) {
  cb (null, {});
}

module.exports = thunkified (Surelia());
