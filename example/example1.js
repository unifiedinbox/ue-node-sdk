
var logging = require("../dist/utils/logger.js")
var UE = require("../dist/UnificationEngine");
var User = require("../dist/models/User")
var ue = new UE("77e34324d1af445fab18907f092f898a","10f1f580972fd134f53189b81443dcb1");
var async = require("async")
var accessToken = "CAACEdEose0cBAOWy8Y2gRGUW0b8QmcS0etwmWZCEcqGUzmqIL8sJMhUzvwF2SYkZCQyoDJeZB0x4EqFlqkSUiAZAB5rbOOe2v7cVuwT2MZBFgc7cI7CHexWnfKTYjl0ZBjfgEw5MmnchWv8lotkwpZA8vAl8oGvrmzhVK5wJJznA5szoQdVf6JRmpqhDde94RdWaUXRm1lhODX8DoqXEKas"

// var hossamApp = new UE("6545514abd26476fb0fffaa76bfff90b","551a6c05c55741c9bc0e12a56b282435");


var user = new User("200f6a0b-b45f-4742-b86e-f1fd2d5e118a","f6063346-0082-4bc1-8093-ebaa14955814")

user.listConnections().then(function(cons){
    cons.forEach(function(con){
        user.removeConnection(con.name).then(function(){
            console.log("DELETED: " + con.name);
        })
    })
}).catch(function(err){
    console.log(err);
})
// user.addConnection("fb3","facebook",accessToken)
// .then(function(connection){
//     console.log(connection);
// })
// .catch(function(err){
//     console.log(err);
// })
// function createUser(callback) {
//   logging.info("Creating User")
//   ue.createUser().then(function(user){
//
//     //list user conns
//     logging.warn(typeof user);
//     user.addConnection("facebook","TEST_TOKEN").then(function(connection){
//       user.listConnections().then(function(connections){
//
//       });
//
//     })
//
//
//   }).catch(function(err){
//     console.log("Error deleting user");
//     console.log(err)
//   })
// }
//
// function listUsers(callback) {
//   logging.info("Listing Users");
//   ue.listUsers().then(function(users){
//     callback();
//   })
//   .catch(function(err){
//     console.log(err);
//   });
//
//
// }
//
//
// async.auto({
//   createUser: createUser,
//   listUsers: listUsers,
// }, function(done){
//   logging.info("Done");
// });
