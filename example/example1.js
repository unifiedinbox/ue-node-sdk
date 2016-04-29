
var logging = require("../dist/utils/logger.js")
var UE = require("../dist/UnificationEngine");
var User = require("../dist/models/User")
var ue = new UE("b56063451547432d99111c91fd5d968b","695590bcf875546bf85c6358d3512ef8");
var async = require("async")
var accessToken = "EAACEdEose0cBAG2I6UroYXcpxpIArWGjt6rDxZAh6ThAMleXZACBZAG2IwNNl8Y0hl5UftPcc4RQ6xZAFGt2RWxa2P8sca1OmBZANUeAUD8uiJxaRXGcKDEZBnhfVpEsBBS7ZAgdVTQ4aI881ULYjXwUsqNJIwuBrj3YUpn3GTepgZDZD";
// var hossamApp = new UE("6545514abd26476fb0fffaa76bfff90b","551a6c05c55741c9bc0e12a56b282435");


ue.createUser().then(function(user){
user.addConnection("facebook","facebook",accessToken)
.then(function(connection){

    connection.sendMessage({
        "receivers":[
            {
                "name":"me"
            },
            {
                "name":"Page",
                "id":"122"
            }
        ],
        "message":{
            "subject":"test",
            "body": "ABC",
            "image":"http://politibits.blogs.tuscaloosanews.com/files/2010/07/sanford_big_dummy_navy_shirt.jpg",
            "link":{
                "uri": "http://google.com",
                "description": "link desc",
                "title":"link title"
            }
        }
    })
    .then(function(uris){
        console.log(uris) //list of posted msg uris
    })
    .catch(function(err){
        console.log(err);
    })
}).catch(function(err){
    console.log(err);
})
});
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
