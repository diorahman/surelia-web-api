var request = require ("supertest").agent;
var resources = "../../resources";
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
