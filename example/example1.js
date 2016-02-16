
var logging = require("../dist/utils/logger.js")
var UE = require("../dist/UnificationEngine");
var User = require("../dist/models/User")
var ue = new UE("77e34324d1af445fab18907f092f898a","10f1f580972fd134f53189b81443dcb1");
var async = require("async")
var accessToken = "CAACEdEose0cBAFsVDWG53azkfubZCn6yrl0PxQRz131rbLwbWZBF4exmHVvlZBNs8QRhgupDEZB2ZBmQvu7nINk6kubZAooSf3lq6xkbtc3Dl1ZBA5kRNLUuciD9EcedUrqA7ue4QF8eM6b7Vn6ronpF012n4yXLOuuGGzlCFPfoijl7VPMU5ZAF8RYT5xWdIxNdJiS3DtHQZAgZDZD";
// var hossamApp = new UE("6545514abd26476fb0fffaa76bfff90b","551a6c05c55741c9bc0e12a56b282435");


var user = new User("200f6a0b-b45f-4742-b86e-f1fd2d5e118a","f6063346-0082-4bc1-8093-ebaa14955814")
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
    .then(function(res){
        console.log(res)
    })
    .catch(function(err){
        console.log(err);
    })
}).catch(function(err){
    console.log(err);
})
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
