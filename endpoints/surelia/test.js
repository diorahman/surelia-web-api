var request = require ("supertest").agent;
var async = require ("async");
var qsify = require ("koa-qs");

// bootstrap

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

describe ("Surelia", function (){

  it ("Authenticate", function (done){

    // GET
    var uri = "/api/1/surelia/authenticate";

    var data = {
      user: "mdamt",
     pass: "mdamtok"
    };
    request (toServer())
    .post (uri)
    .send (data)
    .expect (200)
    .end(function (err, res){
      done(err);
    });
  });

  it ("Get boxes", function (done){

    // GET
    var uri = "/api/1/surelia/boxes";

    request (toServer())
    .get (uri)
    .expect (200)
    .end(function (err, res){
      done(err);
    });

  });
});
