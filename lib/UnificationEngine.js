import "babel-polyfill";


/*
 * https://developer.unificationengine.com/
 */

import UERequest from "./api/ue_request.js";
import User from "./models/User.js";

export default class UnificationEngine {

    constructor( apiKey, apiSecret ) {
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
    }

    createUser() {
        if ( !this.apiKey || !this.apiSecret ) {
            throw new Error("API_KEY and API_SECRET are required");
        }
        return new Promise(( resolve, reject ) => {
            UERequest({
                url    : "https://apiv2.unificationengine.com/v2/user/create",
                method : "POST",
                auth   : {
                    user : this.apiKey,
                    pass : this.apiSecret
                }
            })
            .then(user  => {
                var ueUser = new User(user.uri);
                resolve(ueUser);
            })
            .catch(err  => reject(err));

        });
    }

    //UEUser Object
    deleteUser( user ) {
        return UERequest({
            url    : "https://apiv2.unificationengine.com/v2/user/delete",
            method : "POST",
            auth   : {
                user : this.apiKey,
                pass : this.apiSecret
            },
            form   : {
                uri : user.uri
            }
        });
    }

    listUsers() {
        return new Promise(( resolve, reject ) => {
            UERequest({
                url    : "https://apiv2.unificationengine.com/v2/user/list",
                method : "POST",
                auth   : {
                    user : this.apiKey,
                    pass : this.apiSecret
                }
            })
            .then(users  => resolve(users))
            .catch(err  => reject(err));
        });
    }

}
