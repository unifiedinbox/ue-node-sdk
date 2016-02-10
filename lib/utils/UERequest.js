import request from "request";
import logger from "./logger.js";
// App Logger
//import logger from "../utils/logger.js";

/**
 * Used
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
      try {
        //console.log(body);
        //TODO: catch api errors
        body = JSON.parse(res.body);
        resolve(body);
      }
      catch ( parseException ) {
        //TODO: Catch error
        reject(err, parseException);
      }
    });

  });

};
