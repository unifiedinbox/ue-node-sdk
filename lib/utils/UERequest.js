import request from "request";
import errors from "../config/errors.js"
import logger from "./logger.js";

/**
 * HTTP Request Middleware
 * @param _requestOptions Object with request options for a list of all options  check https://www.npmjs.com/package/request
 * @returns a promise that resolves to the request body
 */
module.exports = function ( _requestOptions ) {

    // UE Requires empty json object if no params to be passed
    _requestOptions.form = _requestOptions.form || "{}";

    // set POST to default method
    _requestOptions.method = _requestOptions.method || "POST";

    //Stringify form
    if ( typeof _requestOptions.form === "object" ) {
        _requestOptions.form = JSON.stringify(_requestOptions.form);
    }

    logger.debug(`http => ${_requestOptions.url} `,_requestOptions);

    return new Promise(( resolve, reject ) => {
        request(_requestOptions, ( err, res, body ) => {
            logger.debug(`resp => ${body.trim()}`)

            if (!err && res.statusCode == 200) {
                console.log(body) // Show the HTML for the Google homepage.
                try {
                    body = JSON.parse(res.body);
                    resolve(body);
                }
                catch ( parseException ) {
                    reject(err, parseException);
                }
            }
            else {
                if(errors[res.statusCode]){
                    reject(errors[res.statusCode]);
                    logger.error(errors[res.statusCode])
                }
                else {
                    reject({
                        status: res.statusCode,
                        message: body
                    });
                    logger.error(body);
                }
            }
        });

    });

};
