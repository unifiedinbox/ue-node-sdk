import UERequest from "../utils/UERequest.js";
import UEConnection from "./UEConnection.js";
import supportedConnectionSchemes from "../config/service_schemes.js";

export default class User {

    //URI: user://e9759590-54ef-4cd3-a01c-cb2241ddd812:1aee1a25-e0c4-4036-a8fd-4d41adc8611b@
    //COMB: key,secret
    constructor(args){
        let key,secret;
        //Check if arguments is user uri or key,secret combination
        if(arguments[1]){
            [key,secret] = [arguments[0],arguments[1]];
            this.uri = `user://${key}:{secret}@`;
        }
        else {
            //Extract user tokens from returned uri
            const keySecretPattern = /user:\/\/(.+):(.+)@/;

            //Destructing assignment for userKey, userSecret
            [key, secret] = [uri.match(keySecretPattern)[1], uri.match(keySecretPattern)[2]];
            this.uri = arguments[0];
        }

        this.userKey = key;
        this.userSecret = secret;
        if(!this.userKey || !this.userSecret){
            throw new Error("USER_KEY and USER_SECRET are required.");
        }
    }



    /**
     * Adds a connection to the current user
     *
     * @param service a string representing a connector service - supported services are in config/service_schemes.js
     * @param serviceAccessToken service access token acquired from the provider (fb token, twitter token..etc)
     *
     * @returns {UEConnection} connection the created connection
     */
    addConnection(service, serviceAccessToken) {
        if(!supportedConnectionSchemes.includes(service)){
            throw new Error(`Unrecognized service connection scheme: ${service} `)
        }

        //Build service url
        //TODO: Make more dynamic
        const serviceUrl = `${service}://${serviceAccessToken}@${service}.com`;
        return new Promise((resolve,reject) => {
            UERequest({
                url: "https://apiv2.unificationengine.com/v2/connection/add",
                method: "POST",
                auth: {
                    user: this.userKey,
                    pass: this.userSecret
                },
                form:{
                    uri: serviceUrl,
                    name: service
                }
            })
            .then(connection => {
                const ueConnection = new UEConnection(connection);
                resolve(ueConnection);
            })
            .catch(err => reject(err));
        });
    }




    //TODO: Not working from API, returns auth required
    listConnections() {
        if ( !this.userKey || !this.userSecret ) {
            throw new Error("User not authenticated");
        }
        return new Promise(( resolve, reject ) => {
            UERequest({
                url    : "https://apiv2.unificationengine.com/v2/connection/list",
                method : "POST",
                auth   : {
                    user : this.userKey,
                    pass : this.userSecret
                }
            })
            .then(connections  => {
                connections = connections.map( (conn) => new UEConnection(con) )
                resolve(connections);
            })
            .catch(err  => reject(err));

        });

    }



    //TODO: param: facebook
    removeConnection(connection) {

    }




}
