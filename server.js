var koa = require("koa");
var mount = require("koa-mount");
var options = {
  root : __dirname + "/endpoints",
  db : "mongodb://localhost/test-api",
  driver : require ("mongoose")
}

var api = require ("./")(options);
var server = koa();
server.use(mount(api));
server.listen(3001);

console.log ("3001");