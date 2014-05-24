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

try {
var userData = require("./user-test.json");
} catch(e) {
  console.log("\n\nPrepare a file called user-test.json containing your imap credentials before starting test");
  console.log("{ \"user\": \"\", \"pass\": \"\"}\n\n");
  process.exit(-1);
}


describe ("Surelia", function (){

  it ("Authenticate", function (done){

    // GET
    var uri = "/api/1/surelia/authenticate";

    var data = {
      user: userData.user,
     pass: userData.pass
    };
    request (toServer())
    .post (uri)
    .send (data)
    .expect (200)
    .end(function (err, res){
      console.log(res.body);
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
      console.log(JSON.stringify(res.body));
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
     
      console.log(res.body);
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
      console.log(res.body);
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
      console.log(res.body);
      done(err);
    });

  });

  it ("Read a raw email in a box", function (done){

    // GET
    var uri = "/api/1/surelia/boxes/INBOX/" + uploadedEmail + "/raw";

    request (toServer())
    .get (uri)
    .expect (200)
    .expect ("Content-Type", /text\/plain/)
    .end(function (err, res){
      console.log(res.text);
      done(err);
    });
  });

  it ("Read an email's headers in a box", function (done){

    // GET
    var uri = "/api/1/surelia/boxes/INBOX/" + uploadedEmail + "/headers";

    request (toServer())
    .get (uri)
    .expect (200)
    .end(function (err, res){
      console.log(res.body);
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
      console.log(res.body);
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
      console.log(res.body);
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
      console.log(res.body);
      done(err);
    });

  });

  var draftId;
  it ("Compose a new email", function (done){

    var uri = "/api/1/surelia/drafts";
    var data = {
      message: "From: test@test.com\nTo: test2@test2.com\nSubject: Test\n\nDraft Message"
    };

    request (toServer())
    .put(uri)
    .send(data)
    .expect (200)
    .end(function (err, res){
     
      console.log(res.body);
      draftId = res.body.data.uid;
      
      done(err);
    });

  });


  it ("Update draft email", function (done){

    var uri = "/api/1/surelia/drafts/" + draftId;
    var data = {
      message: "From: test@test.com\nTo: mdamt@mnots.eu\nSubject: Test\n\nDraft Message " + (new Date)
    };

    request (toServer())
    .put(uri)
    .send(data)
    .expect (200)
    .end(function (err, res){
     
      console.log(res.body);
      draftId = res.body.data.uid;
      
      done(err);
    });

  });


  it ("Send the draft email", function (done){

    var uri = "/api/1/surelia/drafts/" + draftId;

    request (toServer())
    .post(uri)
    .send({draftId: draftId})
    .expect (200)
    .end(function (err, res){
     
      console.log(res.body);
      
      done(err);
    });

  });





});
