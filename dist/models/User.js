"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _utilsUERequestJs = require("../utils/UERequest.js");

var _utilsUERequestJs2 = _interopRequireDefault(_utilsUERequestJs);

var _ConnectionJs = require("./Connection.js");

var _ConnectionJs2 = _interopRequireDefault(_ConnectionJs);

var _configService_schemesJs = require("../config/service_schemes.js");

var _configService_schemesJs2 = _interopRequireDefault(_configService_schemesJs);

var _utilsLoggerJs = require("../utils/logger.js");

var _utilsLoggerJs2 = _interopRequireDefault(_utilsLoggerJs);

var User = (function () {

    //URI: user://e9759590-54ef-4cd3-a01c-cb2241ddd812:1aee1a25-e0c4-4036-a8fd-4d41adc8611b@
    //COMB: key,secret
    /**
     * Constructor
     * @desc The constructor can be in one of two forms; URI form or key,secret form. eg new User(key,secret) or new User(uri)
     * @param {String} uri the user uri string
     * @param {String} key the user key
     * @param {String} secret the user secret
     */

    function User(uri) {
        _classCallCheck(this, User);

        var key = undefined,
            secret = undefined;
        //Check if arguments is user uri or key,secret combination
        if (arguments[1]) {
            key = arguments[0];
            secret = arguments[1];

            this.uri = "user://" + key + ":{secret}@";
        } else {
            //Extract user tokens from returned uri
            var keySecretPattern = /user:\/\/(.+):(.+)@/;

            //Destructing assignment for userKey, userSecret
            key = uri.match(keySecretPattern)[1];
            secret = uri.match(keySecretPattern)[2];

            this.uri = arguments[0];
        }

        this.userKey = key;
        this.userSecret = secret;
        if (!this.userKey || !this.userSecret) {
            throw new Error("USER_KEY and USER_SECRET are required.");
        }
    }

    /**
     * Adds a connection to the current user
     *
     * @param {String} connectionName the connection identifier. Unique per connection
     * @param {String} service a string representing a connector service - supported services are in config/service_schemes.js
     * @param {String} serviceAccessToken service access token acquired from the provider (fb token, twitter token..etc)
     *
     * @return {Promise<Connection>} connection the created connection
     */

    _createClass(User, [{
        key: "addConnection",
        value: function addConnection(connectionName, service, serviceAccessToken, optionalParams) {
            var _this = this;

            if (!_configService_schemesJs2["default"].includes(service)) {
                throw new Error("Unrecognized service connection scheme: " + service + " ");
            }

            // const connectionUri  = `${service}://${serviceAccessToken}@${service}.com`;
            //var connectionUri = service + "://" + serviceAccessToken + "@" + service + ".com";
            var connectionUri = service + "://" + serviceAccessToken;
            if (service != "smtp") //new  change
                {
                    connectionUri += "@" + service + ".com";
                }

            if (optionalParams) {
                var params = '';
                for (var key in optionalParams) {

                    params = params + key + '=' + optionalParams[key] + '&';
                }

                connectionUri = connectionUri + '/?' + params;
            }
            connectionUri = connectionUri.replace(/&\s*$/, ""); //new  change
            return new Promise(function (resolve, reject) {
                (0, _utilsUERequestJs2["default"])({
                    url: "https://apiv2.unificationengine.com/v2/connection/add",
                    method: "POST",
                    auth: {
                        user: _this.userKey,
                        pass: _this.userSecret
                    },
                    form: {
                        uri: connectionUri,
                        name: connectionName
                    }
                }).then(function (connection) {
                    var ueConnection = new _ConnectionJs2["default"](connectionName, connectionUri, _this);
                    resolve(ueConnection);
                })["catch"](function (err) {
                    return reject(err);
                });
            });
        }

        /**
         * List connections for current user
         * @return {Promise<Connection>} List of Connection objects representing the user connections
         */
    }, {
        key: "listConnections",
        value: function listConnections() {
            var _this2 = this;

            if (!this.userKey || !this.userSecret) {
                throw new Error("User not authenticated");
            }
            return new Promise(function (resolve, reject) {
                (0, _utilsUERequestJs2["default"])({
                    url: "https://apiv2.unificationengine.com/v2/connection/list",
                    method: "POST",
                    auth: {
                        user: _this2.userKey,
                        pass: _this2.userSecret
                    }
                }).then(function (response) {
                    // Parse response and create Connection objects
                    var connectionsResponse = response.connections;
                    var connections = (function () {
                        var connectionObjects = [];
                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError = undefined;

                        try {
                            for (var _iterator = Object.keys(connectionsResponse)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                var key = _step.value;

                                var connection = new _ConnectionJs2["default"](key, connectionsResponse[key].uri, _this2);
                                connectionObjects.push(connection);
                            }
                        } catch (err) {
                            _didIteratorError = true;
                            _iteratorError = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion && _iterator["return"]) {
                                    _iterator["return"]();
                                }
                            } finally {
                                if (_didIteratorError) {
                                    throw _iteratorError;
                                }
                            }
                        }

                        return connectionObjects;
                    })();
                    resolve(connections);
                })["catch"](function (err) {
                    return reject(err);
                });
            });
        }

        /**
         * Removes a connection from a user
         *
         * @param {String} connectionName the connection identifier
         * @return {Promise}
         */
    }, {
        key: "removeConnection",
        value: function removeConnection(connectionName) {
            return (0, _utilsUERequestJs2["default"])({
                url: "https://apiv2.unificationengine.com/v2/connection/remove",
                method: "POST",
                auth: {
                    user: this.userKey,
                    pass: this.userSecret
                },
                form: {
                    name: connectionName
                }
            });
        }

        /**
         * Tests a connection to a connector
         *
         * @param {String} serviceUri service uri. eg: facebook://accesstoken@facebook.com
         * @return {Promise}
         */
    }, {
        key: "testConnection",
        value: function testConnection(serviceUri) {
            return (0, _utilsUERequestJs2["default"])({
                url: "https://apiv2.unificationengine.com/v2/connection/test",
                method: "POST",
                auth: {
                    user: this.userKey,
                    pass: this.userSecret
                },
                form: {
                    uri: serviceUri
                }
            });
        }
    }]);

    return User;
})();

exports["default"] = User;
module.exports = exports["default"];