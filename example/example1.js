
var UE = require("../dist/UnificationEngine");
var ue = new UE("b56063451547432d99111c91fd5d968b","695590bcf875546bf85c6358d3512ef8");
ue.createUser().then(function(users){
    console.log(users);

    ue.listUsers().then(function(users){
        console.log(users);
    })
    .catch(function(err){
        console.log(err);
    })
}).catch(function(err){
    console.log("error:");
    console.log(err);
})



