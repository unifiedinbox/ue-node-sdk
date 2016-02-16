import User from "./User.js"
import UERequest from "../utils/UERequest.js"
export default class Connection {

    /**
     * Constructor
     * @param {String}  connectionName the connection identifier
     * @param {String} connectionUri the connection uri
     * @param {User} User the User instance of the user owning the connection
     *
     */
    constructor(connectionName, connectionUri, user) {
        if(!(user instanceof User))
            throw new Error("USer instance required when creating a connection");
        this.uri = connectionUri;
        this.name = connectionName;
        this.user = user;
    }



    //TODO: undefined
    connectionRefresh() {

    }

    /**
     * Sends a message to service using a connector. A message can have multiple parts each with a different type.
     * eg: One can send a message with 2 parts (image_link, body) to send a message with an image and text
     *
     * @param {Object} messageOptions options for message
     * @param {String} messageOptions.subject message subject
     * @param {Array} messageOptions.receivers channels receiving the message
     * @param {String} messageOptions.receivers.name channel name (Me | Page)
     * @param {String} messageOptions.receivers.address in case of Page, this is the page id
     * @param {String} messageOptions.receivers.Connector the connector identifier that will be used to send the msg
     * @param {Array} messageOptions.parts message parts
     * @param {Number} messageOptions.parts.id part id
     * @param {Number} messageOptions.parts.contentType binary | plain/text | html
     * @param {Number} messageOptions.parts.type body | image_link | link | link_title | link_description
     * @param {Number} messageOptions.parts.data the part payload
     *
     * @returns {Promise}
     */
    //TODO: Simplify params
    sendMessage(messageOptions) {
        //Mutate receiver connector to current instance
        messageOptions.receivers = messageOptions.receivers.map((rec)=> {
            rec.Connector = this.name;
            return rec
        });
        return UERequest({
            url    : "https://apiv2.unificationengine.com/v2/message/send",
            method : "POST",
            auth   : {
                user : this.user.userKey,
                pass : this.user.userSecret
            },
            form: {
                message: messageOptions
            }
        });
    }
}
