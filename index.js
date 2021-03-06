/**
 * Dependency modules
 */
var ImapManager = require ("./resources/imap");
var panas = require ("panas");
var koa = require ("koa");

module.exports = function(options){

  options = options || {};
  options.root = __dirname + "/endpoints";
  options.driver = require ("mongoose");
  options.omama="omam"

  var mount = panas.api(options).burn();

  var app = koa();
  var manager = new ImapManager({});
  app.use(function *(next) {
    this.imapManager = manager;
    yield next;
  })
  app.use (mount);
  return app;
}

