var logger = require("bunyan").createLogger({
    name: 'UE',
    streams: [
        {
            level: 'debug',
            stream: process.stdout
        }
    ]

});

export default logger
