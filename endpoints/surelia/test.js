var request = require ("supertest").agent;
var async = require ("async");
var qsify = require ("koa-qs");

// bootstrap

var _ = require ("lodash");
var policy = require ("../../policy");

// index
var index = __dirname + "/../../index.js";
// related options for api
var options = {
  root : index + "/endpoints", // the app index
  db : "mongodb://localhost/test", // the db uri
  driver : require ("mongoose") // the driver
}
options =_.merge(policy, options);

var app = qsify(require(index)(options));
app.on("error", function(err){console.log(err.stack)})

var toServer = function (){ return app.listen()}

describe ("Surelia", function (){

  it ("Authenticate", function (done){

    // GET
    var uri = "/api/1/surelia/authenticate";

    var data = {
      user: "",
     pass: ""
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
      console.log(res);
      done(err);
    });

  });

  var uploadedEmail;
  it ("Upload an email into a box", function (done){

    var uri = "/api/1/surelia/boxes/INBOX";
    var data = {
      message: "From: test@test.com\nTo: test2@test2.com\nSubject: Test\n\nMessage"
    };

    request (toServer())
    .put(uri)
    .send(data)
    .expect (200)
    .end(function (err, res){
     
      console.log(res);
      uploadedEmail = res.body.data.uid;
      
      done(err);
    });

  });



  it ("Get emails in a box", function (done){

    // GET
    var uri = "/api/1/surelia/boxes/INBOX";

    request (toServer())
    .get (uri)
    .expect (200)
    .end(function (err, res){
      console.log(res);
      done(err);
    });

  });

  it ("Read an email in a box", function (done){

    // GET
    var uri = "/api/1/surelia/boxes/INBOX/" + uploadedEmail;

    request (toServer())
    .get (uri)
    .expect (200)
    .end(function (err, res){
      console.log(res);
      done(err);
    });

  });

  it ("Flag an email in a box with read flag", function (done){

    // GET
    var uri = "/api/1/surelia/boxes/INBOX/" + uploadedEmail;

    request (toServer())
    .put (uri)
    .send({flag: "\Seen"})
    .expect (200)
    .end(function (err, res){
      console.log(res);
      done(err);
    });

  });

  it ("Unflag the read flag from an email in a box", function (done){

    // GET
    var uri = "/api/1/surelia/boxes/INBOX/" + uploadedEmail;

    request (toServer())
    .put (uri)
    .send({unflag: "\Seen"})
    .expect (200)
    .end(function (err, res){
      console.log(res);
      done(err);
    });

  });

  it ("Delete an email in a box", function (done){

    // GET
    var uri = "/api/1/surelia/boxes/INBOX/" + uploadedEmail;

    request (toServer())
    .del (uri)
    .expect (200)
    .end(function (err, res){
      console.log(res);
      done(err);
    });

  });




});
