var helper = require ("panas").helper;
var Router = helper.Router;

module.exports = Routes;

function Routes (name, mid, handle) {
    
  // Create a router object with namespace `name` and middleware `mid`
  var router = new Router(name, mid);
  
  // users
  router.GET ("/users", handle.find);
  router.GET ("/users/:id", handle.findOne);
  router.POST ("/users", handle.create);
  router.PUT ("/users/:id", handle.update);

  // account
  router.GET ("/account/colleagues", handle.colleagues);
  router.GET ("/account/activate/:secret", handle.getActivate);
  router.POST ("/account/activate", handle.postActivate);
  router.POST ("/account/login", handle.authenticate);
  
  // return the router;
  return router;
}

