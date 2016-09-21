"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _request = require("request");

var _request2 = _interopRequireDefault(_request);

var _configErrorsJs = require("../config/errors.js");

var _configErrorsJs2 = _interopRequireDefault(_configErrorsJs);

var _loggerJs = require("./logger.js");

var _loggerJs2 = _interopRequireDefault(_loggerJs);

/**
 * HTTP Request Middleware
 * @param _requestOptions Object with request options for a list of all options  check https://www.npmjs.com/package/request
 * @returns {Promise} promise  a promise that resolves to the request body
 */
module.exports = function (_requestOptions) {

    // UE Requires empty json object if no params to be passed
    _requestOptions.form = _requestOptions.form || "{}";

    // set POST to default method
    _requestOptions.method = _requestOptions.method || "POST";

    //Stringify form
    if (typeof _requestOptions.form === "object") {
        _requestOptions.form = JSON.stringify(_requestOptions.form);
    }

    // logger.debug(`http => ${_requestOptions.url} `,_requestOptions);

    return new Promise(function (resolve, reject) {
        (0, _request2["default"])(_requestOptions, function (err, res, body) {
            //  logger.debug(`resp => ${body.trim()}`)

            if (!err && res.statusCode == 200) {

                try {
                    body = JSON.parse(res.body);
                    if (body.status != 200) {
                        return reject(body);
                    }
                    resolve(body);
                } catch (parseException) {
                    reject(err, parseException);
                }
            } else {
                if (_configErrorsJs2["default"][res.statusCode]) {
                    reject(_configErrorsJs2["default"][res.statusCode]);
                    // logger.error(errors[res.statusCode])
                } else {
                        reject({
                            status: res.statusCode,
                            info: body
                        });
                        // logger.error(body);
                    }
            }
        });
    });
};