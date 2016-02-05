import "babel-polyfill";


/*
 * https://developer.unificationengine.com/
 */

import UERequest from "./api/ue_request.js"
import User from "./models/User.js"

export default class UnificationEngine {

    constructor(apiKey, apiSecret){
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
    }

    createUser () {
        if(!this.apiKey || !this.apiSecret) {
            throw new Error("API_KEY and API_SECRET are required");
        }
        return new Promise( (resolve,reject) => {
            UERequest({
                url: "https://apiv2.unificationengine.com/v2/user/create",
                method: "POST",
                auth:{
                    user: this.apiKey,
                    pass: this.apiSecret
                }
            })
            .then( (user) =>  {
                //Extract user tokens from returned uri
                var keySecretPattern = /user:\/\/(.+):(.+)@/

                //Destructing assignment for userKey, userSecret
                var key,secret;
                [key,secret] = [ user.uri.match(keySecretPattern)[1] , user.uri.match(keySecretPattern)[1] ]


                var ueUser = new User(key,secret, user.index);
                resolve(ueUser);
            })
            .catch( (err) => reject(err) );

        } );
    }


    listUsers() {
        return new Promise( (resolve, reject) => {
            UERequest({
                url:   "https://apiv2.unificationengine.com/v2/user/list",
                method: "POST",
                auth: {
                    user: this.apiKey,
                    pass: this.apiSecret 
                }
            })    
            .then( (users) => resolve(users) )
            .catch( (err) => reject(err) );
        });
    }

}
