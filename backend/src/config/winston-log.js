
const { format, createLogger, transports } = require("winston");
// const DailyRotateFile = require("winston-daily-rotate-file");
// const transport = new DailyRotateFile({
//     filename:  __dirname + '/logs/INIIL-Invest-%DATE%.log',
//     datePattern: "YYYY-MM-DD",
//     prepend: true,
// });
// transport.on("rotate", function (oldFilename, newFilename) {
//     // call function like upload to s3 or on cloud
// });
// Logger configuration
const logConfiguration = {
    'transports': [
        // Using defulat configurations
        new transports.Console(),
        // new transports.File({
        //      level: 'error',
        //     filename: __dirname + '/logs/example.log'
        // })

        // Using the daily rotate file
        // transport
    ],
    format: format.combine(
        format.colorize(),
        format.timestamp({
           format: 'MMM-DD-YYYY HH:mm:ss'
        }),
        format.printf(info => {
            const { level, ...args } = info;
            return `${level}: ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
        }),
        // format.prettyPrint()
    )
};
const logger = createLogger(logConfiguration);
// Log a message
// logger.info("Hello, Winston logger, some info!");
module.exports = logger