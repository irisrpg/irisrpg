const winston = require('winston');
const colors = require('colors');
const fs = require('fs');
const path = require('path');

module.exports = class Logger {
    constructor() {
        const logDir = 'log';
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir);
        }

        this.logger = winston.createLogger({
            level: process.env === 'production' ? 'info' : 'debug',
            format: winston.format.combine(
                winston.format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }),
                winston.format.printf(info => {
                    var time = info.timestamp;
                    var level = info.level;
                    var message = info.message;
                    var process = (info.process ? info.process : "Main Thread").toLowerCase().split(' ');
                    for (var i = 0; i < process.length; i++) {
                        process[i] = process[i].charAt(0).toUpperCase() + process[i].substring(1);     
                    }
                    process = process.join(' ');
                    return JSON.stringify({
                        "timestamp": time,
                        "level": level,
                        "process": process,
                        "message": message.toString()
                    })
                })
            ),
            transports: [
                new winston.transports.File({ filename: path.join(logDir, 'logs-'+Date.now()+'.log') })
            ]
        });
        if (process.env.NODE_ENV !== 'production') {
            this.logger.add(new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.printf(info => {
                        var time = new Date(info.timestamp).getTime();
                        time = colors.bgBlack.yellow(time);
    
                        var level = info.level;
                        level = colors.bgYellow.black(" " + level.toUpperCase() + " ");
    
                        var message = info.message;
                        switch(info.level) {
                            case "debug":
                                message = colors.green(message);
                                break;
                            case "verbose":
                                message = colors.cyan(message);
                                break;
                            case "info":
                                message = colors.blue(message);
                                break;
                            case "warn":
                                message = colors.yellow(message);
                                break;
                            case "error":
                                message = colors.red.bold(message);
                                break;
                        }
    
                        var process = (info.process ? info.process : "Main Thread").toLowerCase().split(' ');
                        for (var i = 0; i < process.length; i++) {
                            process[i] = process[i].charAt(0).toUpperCase() + process[i].substring(1);     
                        }
                        process = colors.gray("[ "+process.join(' ')+" ]");
    
                        return `${time} ${level} ${message} ${process}`;
                    })
                )
            }));
        }
    }

    initLogger(process) {
        return this.logger.child({ "requestId": Date.now(), "process": process });
    }

    silly(message, logger = this.logger) {
        logger.silly(message);
    }

    debug(message, logger = this.logger) {
        logger.debug(message);
    }

    verbose(message, logger = this.logger) {
        logger.verbose(message);
    }

    info(message, logger = this.logger) {
        logger.info(message);
    }

    warn(message, logger = this.logger) {
        logger.warn(message);
    }

    error(message, logger = this.logger) {
        logger.error(message);
    }
}