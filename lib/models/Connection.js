import User from "./User.js"
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

    testConnection() {

    }



    connectionRefresh() {

    }

    //TODO: message docs
    sendMessage(message) {

    }

}
