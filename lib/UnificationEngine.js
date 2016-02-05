import "babel-polyfill";

/*
 * https://developer.unificationengine.com/
 */

import UERequest from "./api/ue_request.js"


export default class UnificationEngine {

    constructor(apiKey, apiSecret){
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
    }

    createUser () => {

        if(!this.apiKey || !this.apiSecret) {
            throw new Error("API_KEY and API_SECRET are required");
        }
        return new Promise(function(resolve,reject){
            UERequest({
                url: "https://apiv2.unificationengine.com/v2/user/list",
                method: "POST",
                auth:{
                    user: this.apiKey,
                    pass: this.apiSecret
                }
            }).then(function(user){
                resolve(user);
                logging.debug(user);
            }).catch(function(err){
                logger.error(err);
                reject(err);
            });

        });
    }

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


    //TODO: connection param unified://facebook
    testConnection() {

    }

    listConnections() {

    }


    //TODO: param: facebook
    removeConnection(connection) {

    }

    connectionRefresh() {

    }

    //TODO: message docs
    sendMessage(message) {

    }

}
