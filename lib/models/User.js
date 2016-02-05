import UERequest from "../api/ue_request.js"

export default class User {

    constructor(userKey,userSecret,index){
        this.userKey = userKey;
        this.userSecret = userSecret;
        this.index = index;
    };

    
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
