/**
 * Dependency modules
 */
var panas = require ("panas");
var koa = require ("koa");

module.exports = function(options){

  options = options || {};
  options.root = options.root || __dirname + "/endpoints";
  options.driver = options.driver || require ("mongoose");
  
  return koa().use (panas.api(options).burn());
}






