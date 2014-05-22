var helper = require ("panas").helper;
var Router = helper.Router;

module.exports = Routes;

function Routes (name, mid, handle) {
    
  // Create a router object with namespace `name` and middleware `mid`
  var router = new Router(name, mid);
  
  // Authenticate
  router.POST ("/surelia/authenticate", handle.authenticate);

  // List boxes
  router.GET ("/surelia/boxes", handle.listMailboxes);

  // List emails inside mentioned box
  router.GET ("/surelia/boxes/:id", handle.listEmails);

  // Upload a new email to a mailbox
  router.PUT ("/surelia/boxes/:id", handle.uploadEmail);

  // Read an email with mentioned id in the box
  router.GET ("/surelia/boxes/:id/:emailId", handle.readEmail);

  // Mark/unmark an email with mentioned id in the box with a flag 
  router.PUT ("/surelia/boxes/:id/:emailId", handle.manageFlag);

  // Move an email with mentioned id in the box to trash
  // If the box is the trash box, then delete the email permanently
  router.DEL ("/surelia/boxes/:id/:emailId", handle.deleteEmail);

  // Read a raw email with mentioned id in the box 
  router.GET ("/surelia/boxes/:id/:emailId/raw", handle.readEmailRaw);

  // Read the email headers with mentioned id in the box 
  router.GET ("/surelia/boxes/:id/:emailId/headers", handle.readHeaders);

  // Send a new email
  router.POST ("/surelia/", handle.sendEmail);

  // return the router;
  return router;
}

