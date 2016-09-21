"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var logger = require("bunyan").createLogger({
  name: "UE",
  streams: [{
    level: "debug",
    stream: process.stdout
  }]

});

exports["default"] = logger;
module.exports = exports["default"];