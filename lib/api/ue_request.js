var request = require("request");

// App Logger
import logger from "../utils/logger.js"

/**
 * Used
 */
module.exports = function(_requestOptions){

    /*****************************************
     *
     * Override, validate the request options
     *
     *****************************************/
        // UE Requires empty json object if no params to be passed
    _requestOptions.form = _requestOptions.form || "{}";

        // set GET to default method
    _requestOptions.method = _requestOptions.method || "GET";



    return new Promise(function(resolve,reject){
        request(_requestOptions, function(err,res,body){
            try {
                console.log(body);
                //TODO: catch api errors
                body = JSON.parse(res.body);
                resolve(body);
            }
            catch (parseException){
                //TODO: Catch error 
                reject(body,parseException);
            }
        });

    })

}
