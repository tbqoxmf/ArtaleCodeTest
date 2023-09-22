const winston = require('winston')
const winstonDaily = require('winston-daily-rotate-file')
const appRoot = require('app-root-path')
const dotenv = require('dotenv')

const logDir = `${appRoot}/logs`

const { label, combine, timestamp, printf } = winston.format;

const logFormat = printf(info => {
    return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`
})

/*
Log Level
Error : 0, warn: 1, info: 2
*/
dotenv.config()
const logger = winston.createLogger({
    format: combine(
        label({
            label: 'ArtaleTest'
        }),

        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        logFormat,
    ),
    transports: [
        new winstonDaily({
            level: 'info',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir,
            filename: `%DATE%.log`,
            maxFiles: 30,
            zippedArchive: true,
        }),

        new winstonDaily({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir,
            filename: `%DATE%.error.log`,
            maxFiles: 30,
            zippedArchive: true,
        }),


    ],
    exceptionHandlers: [
        new winstonDaily({
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir,
            filename: `%DATE%.exception.log`,
            maxFiles: 30,
            zippedArchive: true,
        })
    ]
})

if (process.env.NODE_ENV !== 'publish') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
        )
    }))
}

module.exports = logger;
