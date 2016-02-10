import UERequest from "../utils/UERequest.js";
import UEConnection from "../models/UEConnection.js";

export default class User {

  //user://e9759590-54ef-4cd3-a01c-cb2241ddd812:1aee1a25-e0c4-4036-a8fd-4d41adc8611b@
  constructor(uri){
    //Extract user tokens from returned uri
    var keySecretPattern = /user:\/\/(.+):(.+)@/;

    //Destructing assignment for userKey, userSecret
    var key,secret;
    [key, secret] = [uri.match(keySecretPattern)[1], uri.match(keySecretPattern)[2]];
    this.userKey = key;
    this.userSecret = secret;
    this.uri = uri;
    if(!this.userKey || !this.userSecret){
      throw new Error("USER_KEY and USER_SECRET are required.");
    }
  }



  //TODO: ServiceEnum
  addConnection(service, serviceAccessToken) {


  }


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
