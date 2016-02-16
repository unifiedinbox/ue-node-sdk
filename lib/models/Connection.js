import User from "./User.js"
export default class Connection {

    /**
     * Constructor
     * @param {String}  connectionName the connection identifier
     * @param {String} connectionUri the connection uri
     * @param {User} ueUser the User instance of the user owning the connection
     *
     */
    constructor(connectionName, connectionUri, ueUser) {
        if(!(ueUser instanceof User))
            throw new Error("UEUSer instance required when creating a connection");
        this.uri = connectionUri;
        this.name = connectionName;
        this.user = ueUser;
    }

    testConnection() {

    }



    connectionRefresh() {

    }

    //TODO: message docs
    sendMessage(message) {

    }

}
