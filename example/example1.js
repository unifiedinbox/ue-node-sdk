
var logging = require("../dist/utils/logger.js")
var UE = require("../dist/UnificationEngine");
var User = require("../dist/models/User")
var ue = new UE("77e34324d1af445fab18907f092f898a","10f1f580972fd134f53189b81443dcb1");
var async = require("async")
var accessToken = "CAACEdEose0cBAIHk7xU861SDlIizx15qttn5jObH2ZCq5mYzaIJHRxMTs4oQHu6ZCeurEihQxQBtGymfNaUAbOC7j38Ty7Lc7qay45t2rga3xLD9km0wIAs168jsfMW7EYZBeZAzN0ZCtUlEdsiX0ENeY7tXALen28z9D5Oan1qRwgLAtwUTTWZB5gr6EvDtgtxNnTxj123cRiBPnJPuFc"
// var hossamApp = new UE("6545514abd26476fb0fffaa76bfff90b","551a6c05c55741c9bc0e12a56b282435");


var user = new User("200f6a0b-b45f-4742-b86e-f1fd2d5e118a","f6063346-0082-4bc1-8093-ebaa14955814")

user.addConnection("facebook","facebook",accessToken)
.then(function(connection){
    connection.sendMessage({
        "receivers":[
            {
                "name":"Me",
                "address":"test.test",
                "Connector":"g"
            }
        ],
        "subject":"test",
        "parts": [
            {
                "id":"0",
                "contentType":"binary",
                "data":"msg2",
                "type":"body"
            },
            {
                "id":"1",
                "contentType":"binary",
                "type":"image_link",
                "name":"filename",
                "data":"http://www.hd-wallpapersdownload.com/upload/bulk-upload/desktop-pictures-of-cute-kittens-and-cats-wallpaper.jpg"
            },
            {
                "id":"2",
                "contentType":"binary",
                "type":"link",
                "data":"http://google.com"
            },
            {
                "id":"3",
                "contentType":"binary",
                "type":"link_description",
                "data":"link description here"
            },
            {
                "id":"4",
                "contentType":"binary",
                "type":"link_title",
                "data":"link title here"
            }
        ]
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
