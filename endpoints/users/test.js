var request = require ("supertest").agent;
var resources = "../../resources";
var async = require ("async");
var qsify = require ("koa-qs");

// bootstrap
var resources = __dirname + "/../../resources";
var user = require (resources + "/user/fixtures");
var users = require (resources + "/user/fixtures/data");

// temp
var user;
var secret;

var _ = require ("lodash");
var policy = require ("../../policy");

// index
var index = __dirname + "/../..";
// related options for api
var options = {
  root : index + "/endpoints", // the app index
  db : "mongodb://localhost/test", // the db uri
  driver : require ("mongoose") // the driver
}
options =_.merge(policy, options);

var app = qsify(require(index)(options));
var toServer = function (){ return app.listen()}

// todo: user bootstrap
before(user.bootstrap());

describe ("Users", function (){

  it ("Create users", function (done){

    function create(user, cb){
      var uri = "/api/1/users";
      request (toServer())
      .post (uri)
      .send (user)
      .expect (200)
      .end (function (err, res){
        cb(err, res);
      });
    }
    async.mapSeries (users, create, done);
  });

  it ("Get admin", function (done){

    // GET
    var uri = "/api/1/users/admin";

    request (toServer())
    .get (uri)
    .expect (200)
    .end(function (err, res){
      secret = res.body.secret;
      done(err);
    });

  });

  it ("Activate a user", function (done){
    var uri = "/api/1/account/activate/" + secret;

    request (toServer())
    .get (uri)
    .expect (200)
    .end(function (err, res){
      done(err);
    });
  });

  it ("Authenticate a user", function (done){
    var uri = "/api/1/account/login";

    request (toServer())
    .post (uri)
    .set ("Content-Type", "application/json")
    .send ({ email : "admin@rockybars.com", password : "test12345" })
    .expect (200)
    .end(function (err, res){
      done(err);
    });
  });


  it ("Get all users", function (done){

    // GET
    var uri = "/api/1/users";

    request (toServer())
    .get (uri)
    .expect (200)
    .end(function (err, res){
      done(err);
    });

  });

});