export default class Connection {
    //TODO: connection param unified://facebook
    //TODO: connection properties => type, access_token
    constructor(connectionName, connectionUri) {
        this.uri = connectionUri;
        this.name = connectionName;
    }

    testConnection() {

    }



    connectionRefresh() {

    }

    //TODO: message docs
    sendMessage(message) {

    }

}
