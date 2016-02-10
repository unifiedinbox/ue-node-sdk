
var logging = require("../dist/utils/logger")
var UE = require("../dist/UnificationEngine");
var ue = new UE("77e34324d1af445fab18907f092f898a","10f1f580972fd134f53189b81443dcb1");
var async = require("async")



function createUser(callback) {
  logging.info("Creating User")
  ue.createUser().then(function(user){

    //list user conns
    logging.warn(typeof user);
    user.addConnection("facebook","TEST_TOKEN").then(function(connection){
      user.listConnections().then(function(connections){

      });

    })


  }).catch(function(err){
    console.log("Error deleting user");
    console.log(err)
  })
}

function listUsers(callback) {
  logging.info("Listing Users");
  ue.listUsers().then(function(users){
    callback();
  })
  .catch(function(err){
    console.log(err);
  });


}


async.auto({
  createUser: createUser,
  listUsers: listUsers,
}, function(done){
  logging.info("Done");
});
