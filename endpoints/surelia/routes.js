var helper = require ("panas").helper;
var Router = helper.Router;

module.exports = Routes;

function Routes (name, mid, handle) {
    
  // Create a router object with namespace `name` and middleware `mid`
  var router = new Router(name, mid);
  
  // List boxes
  router.GET ("/surelia/boxes", handle.listMailboxes);

  // List emails inside mentioned box
  router.GET ("/surelia/boxes/:id", handle.ListEmails);

  // Read an email with mentioned id in the box
  router.GET ("/surelia/boxes/:id/:emailId", handle.readEmail);

  // Mark an email with mentioned id in the box as read
  router.PUT ("/surelia/boxes/:id/:emailId/read", handle.markRead);

  // Mark an email with mentioned id in the box as unread
  router.DEL ("/surelia/boxes/:id/:emailId/read", handle.markUnread);

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

