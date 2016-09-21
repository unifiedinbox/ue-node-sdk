"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

require("babel-polyfill");

var _utilsUERequestJs = require("./utils/UERequest.js");

var _utilsUERequestJs2 = _interopRequireDefault(_utilsUERequestJs);

var _modelsUserJs = require("./models/User.js");

var _modelsUserJs2 = _interopRequireDefault(_modelsUserJs);

var UnificationEngine = (function () {
    function UnificationEngine(apiKey, apiSecret) {
        _classCallCheck(this, UnificationEngine);

        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
    }

    /**
     * Creates a UE User
     *
     * @return {Promise<User>} user the created user
     */

    _createClass(UnificationEngine, [{
        key: "createUser",
        value: function createUser() {
            var _this = this;

            if (!this.apiKey || !this.apiSecret) {
                throw new Error("API_KEY and API_SECRET are required");
            }
            return new Promise(function (resolve, reject) {
                (0, _utilsUERequestJs2["default"])({
                    url: "https://apiv2.unificationengine.com/v2/user/create",
                    method: "POST",
                    auth: {
                        user: _this.apiKey,
                        pass: _this.apiSecret
                    }
                }).then(function (userResponse) {
                    var user = new _modelsUserJs2["default"](userResponse.uri);
                    resolve(user);
                })["catch"](function (err) {
                    return reject(err);
                });
            });
        }

        /**
         * Deletes a UE User
         *
         * @param {Promise<User>} user the user to delete
         * @return {Promise}
         */
    }, {
        key: "deleteUser",
        value: function deleteUser(user) {
            return (0, _utilsUERequestJs2["default"])({
                url: "https://apiv2.unificationengine.com/v2/user/delete",
                method: "POST",
                auth: {
                    user: this.apiKey,
                    pass: this.apiSecret
                },
                form: {
                    uri: user.uri
                }
            });
        }

        /**
         * Returns a list of users for the current app
         *
         * @return {Promise<User>} users array of users on the app
         */
    }, {
        key: "listUsers",
        value: function listUsers() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                (0, _utilsUERequestJs2["default"])({
                    url: "https://apiv2.unificationengine.com/v2/user/list",
                    method: "POST",
                    auth: {
                        user: _this2.apiKey,
                        pass: _this2.apiSecret
                    }
                }).then(function (users) {
                    return resolve(users);
                })["catch"](function (err) {
                    return reject(err);
                });
            });
        }
    }]);

    return UnificationEngine;
})();

exports["default"] = UnificationEngine;
module.exports = exports["default"];