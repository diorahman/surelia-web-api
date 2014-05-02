var policy = require("../../../policy");
var enums = require ("../enums")(policy);
var Roles = enums.Roles;

// the gate
// 0.
var user = {
  email : "admin@rockybars.com",
  password : "test12345",
  roles : [ Roles.types.ADMIN.title ],
  name : "Admin"
}
//--

module.exports = [ 
  user
];
