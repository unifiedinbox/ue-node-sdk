export default class User {

    constructor(userKey,userSecret){
        this.userKey = userKey;
        this.userSecret = userSecret;
    };

    listUsers() {
        return UERequest({
            url:   "https://apiv2.unificationengine.com/v2/user/list",
            method: "POST",
            auth: {
                user: this.userKey,
                pass: this.userSecret 
            }
        });    
    }

    deleteUser() {

    }


    //TODO: ServiceEnum
    addConnection(service, serviceAccessToken) {

    }


    listConnections() {

    }



    //TODO: param: facebook
    removeConnection(connection) {

    }




}
