const path = require('path');
const pino = require('pino');

/**
 * Pino logger and file logger app instance
 */
const logger = pino({
   prettyPrint: {
      levelFirst: true,
      ignore: 'pid,hostname',
      translateTime: true
   },
   prettifier: require('pino-pretty')
})

const fileLogger = pino({
   prettyPrint: {
      levelFirst: true,
      translateTime: true,
      colorize: false
   },
   prettifier: require('pino-pretty')
}, pino.destination(path.join(path.resolve(__dirname), "../../", process.env.LOG_FILE)))

/**
 * Override default console loggin methods
 * 
 */
console.info = (...args) => { logger.info(...args); fileLogger.info(...args) };
console.error = (...args) => { logger.error(...args); fileLogger.error(...args) };
console.warn = (...args) => { logger.warn(...args); fileLogger.warn(...args) };
console.log = console.info;

module.exports = { logger, fileLogger };