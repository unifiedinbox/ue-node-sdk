import "babel-polyfill";
import UERequest from "./utils/UERequest.js";
import User from "./models/User.js";

export default class UnificationEngine {

    constructor( apiKey, apiSecret ) {
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
    }

    /**
     * Creates a UE User
     *
     * @returns {Promise<User>} user the created user
     */
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
            .then(userResponse  => {
                const  user = new User(userResponse.uri);
                resolve(user);
            })
            .catch(err  => reject(err));

        });
    }

    /**
     * Deletes a UE User
     *
     * @param {Promise<User>} user the user to delete
     * @returns {Promise}
     */
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

    /**
     * Returns a list of users for the current app
     *
     * @returns {Promise<[User]>} users array of users on the app
     */
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
