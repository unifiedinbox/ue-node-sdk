import User from "./User.js";
import UERequest from "../utils/UERequest.js";
import logger from "../utils/logger.js";
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
    * Used for message parts
    * @access private
    * @returns {Number} random id
    */
    _generateUniqueId(){
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + "-" + s4() + "-" + s4() + "-" +
        s4() + "-" + s4() + s4() + s4();
    }

    /**
    * Builds the API message parameter from passed options
    *
    * @access private
    * @param {Object} messageOptions options for message
    * @param {Array} messageOptions.receivers channels receiving the message
    * @param {String} messageOptions.receivers.name channel name (Me | Page)
    * @param {String} messageOptions.receivers.id in case of Page, this is the page id
    * @param {String} messageOptions.message.subject message subject
    * @param {Array} messageOptions.message.body message body
    * @param {Array} messageOptions.message.image image uri
    * @param {Array} messageOptions.message.link message link
    * @param {Array} messageOptions.message.link.uri message link uri
    * @param {Array} messageOptions.message.link.description  message link description
    * @param {Array} messageOptions.message.link.title  message link title
    *
    * @returns {Promise}
    */
    _buildMessageQuery(messageOptions) {
        if(!messageOptions.receivers || !messageOptions.message)
            throw new Error("Message must have a message and areceiver");

        const defaultContentType = "binary";
        let params = Object.assign({},messageOptions); //Clone for immutability
        let queryObject = {};
        //Formulate Receivers
        params.receivers = params.receivers.map((receiver)=>{
            if(receiver.name && receiver.name.toLowerCase() === "me"){
                return {
                    "name":"Me",
                    "address":"test.test",
                    "Connector": this.name
                };
            }
            else {

                if(receiver.name && receiver.name.toLowerCase() === "page"){
                    return {
                        "name":"Page",
                        "address": receiver.id,
                        "Connector": this.name
                    };
                }else{
						var name = receiver.name?receiver.name:'';
						var address = receiver.address?receiver.address:'';
						return {
                            "name": name,
                            "address": address,
                            "Connector": this.name
                        };


					}
            }
        });

		if(!params.receivers.length){
				params.receivers= [{
                            "name": "",
                            "address": "",
                            "Connector": this.name
                        }];

		}
        queryObject.receivers = params.receivers;


        //Formulate Message Parts
        queryObject.parts = [];
        if(params.message.body){
            queryObject.parts.push({
                id: this._generateUniqueId(),
                contentType: defaultContentType,
                type: "body",
                data: params.message.body,
            });
        }

        //Image Part
        if(params.message.image){
            queryObject.parts.push({
                id: this._generateUniqueId(),
                contentType: defaultContentType,
                type: "image_link",
                data: params.message.image
            });
        }


        //Link Part
        if(params.message.link) {
            if(params.message.link.uri){
                queryObject.parts.push({
                    id: this._generateUniqueId(),
                    contentType: defaultContentType,
                    type: "link",
                    data: params.message.link.uri
                });
            }

            if(params.message.link.description){
                queryObject.parts.push({
                    id: this._generateUniqueId(),
                    contentType: defaultContentType,
                    type: "link_description",
                    data: params.message.link.description
                });
            }

            if(params.message.link.title){
                queryObject.parts.push({
                    id: this._generateUniqueId(),
                    contentType: defaultContentType,
                    type: "link_title",
                    data: params.message.link.title
                });
            }

        }

        //Subject
        if(params.message.subject) {
            queryObject.subject = params.message.subject;
        }
		 //sender
		if (params.sender) {
			queryObject.sender = params.sender;
		}


        // logger.info(queryObject);
        return queryObject;


    }


    /**
    * Sends a message to service using a connector. A message can have multiple parts each with a different type.
    * eg: One can send a message with 2 parts (image_link, body) to send a message with an image and text
    *
    * @param {Object} messageOptions options for message
    * @param {Array} messageOptions.receivers channels receiving the message
    * @param {String} messageOptions.receivers.name channel name (Me | Page)
    * @param {String} messageOptions.receivers.id in case of Page, this is the page id
    * @param {String} messageOptions.message.subject message subject
    * @param {Array} messageOptions.message.body message body
    * @param {Array} messageOptions.message.image image uri
    * @param {Array} messageOptions.message.link message link
    * @param {Array} messageOptions.message.link.uri message link uri
    * @param {Array} messageOptions.message.link.description  message link description
    * @param {Array} messageOptions.message.link.title  message link title
    *
    * @returns {Promise}
    */
    //TODO: Simplify params
    sendMessage(messageOptions) {
        //Mutate receiver connector to current instance
        messageOptions.receivers = messageOptions.receivers.map((rec)=> {
            rec.Connector = this.name;
            return rec;
        });
        return new Promise( (resolve, reject) => {
            UERequest({
                url    : "https://apiv2.unificationengine.com/v2/message/send",
                method : "POST",
                auth   : {
                    user : this.user.userKey,
                    pass : this.user.userSecret
                },
                form: {
                    message: this._buildMessageQuery(messageOptions)
                }
            }).then( (response) => {
                resolve(response.URIs);
            })
            .catch((err) => {
                if(err.URIs)
                    return resolve(err.URIs);
                reject(err);
            });
        });
    }
}
