"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _UserJs = require("./User.js");

var _UserJs2 = _interopRequireDefault(_UserJs);

var _utilsUERequestJs = require("../utils/UERequest.js");

var _utilsUERequestJs2 = _interopRequireDefault(_utilsUERequestJs);

var _utilsLoggerJs = require("../utils/logger.js");

var _utilsLoggerJs2 = _interopRequireDefault(_utilsLoggerJs);

var Connection = (function () {

    /**
    * Constructor
    * @param {String}  connectionName the connection identifier
    * @param {String} connectionUri the connection uri
    * @param {User} User the User instance of the user owning the connection
    *
    */

    function Connection(connectionName, connectionUri, user) {
        _classCallCheck(this, Connection);

        if (!(user instanceof _UserJs2["default"])) throw new Error("USer instance required when creating a connection");
        this.uri = connectionUri;
        this.name = connectionName;
        this.user = user;
    }

    //TODO: undefined

    _createClass(Connection, [{
        key: "connectionRefresh",
        value: function connectionRefresh() {}

        /**
        * Used for message parts
        * @access private
        * @returns {Number} random id
        */
    }, {
        key: "_generateUniqueId",
        value: function _generateUniqueId() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
            }
            return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
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
    }, {
        key: "_buildMessageQuery",
        value: function _buildMessageQuery(messageOptions) {
            var _this = this;

            if (!messageOptions.receivers || !messageOptions.message) throw new Error("Message must have a message and areceiver");

            var defaultContentType = "binary";
            var params = Object.assign({}, messageOptions); //Clone for immutability
            var queryObject = {};
            //Formulate Receivers
            params.receivers = params.receivers.map(function (receiver) {
                if (receiver.name && receiver.name.toLowerCase() === "me") {
                    return {
                        "name": "Me",
                        "address": "test.test",
                        "Connector": _this.name
                    };
                } else {

                    if (receiver.name && receiver.name.toLowerCase() === "page") {
                        return {
                            "name": "Page",
                            "address": receiver.id,
                            "Connector": _this.name
                        };
                    } else {
                        var name = receiver.name ? receiver.name : '';
                        var address = receiver.address ? receiver.address : '';
                        return {
                            "name": name,
                            "address": address,
                            "Connector": _this.name
                        };
                    }
                }
            });

            if (!params.receivers.length) {
                params.receivers = [{
                    "name": "",
                    "address": "",
                    "Connector": this.name
                }];
            }
            queryObject.receivers = params.receivers;

            //Formulate Message Parts
            queryObject.parts = [];
            if (params.message.body) {
                queryObject.parts.push({
                    id: this._generateUniqueId(),
                    contentType: defaultContentType,
                    type: "body",
                    data: params.message.body
                });
            }

            //Image Part
            if (params.message.image) {
                queryObject.parts.push({
                    id: this._generateUniqueId(),
                    contentType: defaultContentType,
                    type: "image_link",
                    data: params.message.image
                });
            }

            //Link Part
            if (params.message.link) {
                if (params.message.link.uri) {
                    queryObject.parts.push({
                        id: this._generateUniqueId(),
                        contentType: defaultContentType,
                        type: "link",
                        data: params.message.link.uri
                    });
                }

                if (params.message.link.description) {
                    queryObject.parts.push({
                        id: this._generateUniqueId(),
                        contentType: defaultContentType,
                        type: "link_description",
                        data: params.message.link.description
                    });
                }

                if (params.message.link.title) {
                    queryObject.parts.push({
                        id: this._generateUniqueId(),
                        contentType: defaultContentType,
                        type: "link_title",
                        data: params.message.link.title
                    });
                }
            }

            //Subject
            if (params.message.subject) {
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
    }, {
        key: "sendMessage",
        value: function sendMessage(messageOptions) {
            var _this2 = this;

            //Mutate receiver connector to current instance
            messageOptions.receivers = messageOptions.receivers.map(function (rec) {
                rec.Connector = _this2.name;
                return rec;
            });
            return new Promise(function (resolve, reject) {
                (0, _utilsUERequestJs2["default"])({
                    url: "https://apiv2.unificationengine.com/v2/message/send",
                    method: "POST",
                    auth: {
                        user: _this2.user.userKey,
                        pass: _this2.user.userSecret
                    },
                    form: {
                        message: _this2._buildMessageQuery(messageOptions)
                    }
                }).then(function (response) {
                    resolve(response.URIs);
                })["catch"](function (err) {
                    if (err.URIs) return resolve(err.URIs);
                    reject(err);
                });
            });
        }
    }]);

    return Connection;
})();

exports["default"] = Connection;
module.exports = exports["default"];