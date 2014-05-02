/**
 * Dependency modules
 */

// TODO: create a bootstrap function to generate dummy users using fixtures/data

/**
 * Data
 */
var data = require ("./data");
var schemas = require ("../schemas");
var User = schemas.User;


/**
* Expose
*/
module.exports = function (options) {

  var main = function (done) {
    User.remove(function(err){
      done(err);
    })
  }
  
  return main;
}

