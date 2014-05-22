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

  var mount = panas.api(options).burn();

  var app = koa();
  var manager = new ImapManager({});
  app.manager = manager;
  app.use (mount);
  return app;
}

