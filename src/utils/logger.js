const moment = require('moment-timezone');
const chalk = require('chalk');

moment.locale(`vi`);

class logger {
    static log(content, type = 'log') {
        const date = moment().tz('Asia/Ho_Chi_Minh').format(`LTS - L`);
        switch (type) {
            case 'slash': {
                return console.log(
                    chalk.blue(
                        `[${chalk.gray.bold(date)}]:[${chalk.black.bgWhite(type.toUpperCase())}] ${chalk.blue(
                            content,
                        )}`,
                    ),
                );
            }
            case 'prefix': {
                return console.log(
                    chalk.blue(
                        `[${chalk.gray.bold(date)}]:[${chalk.black.bgCyanBright(type.toUpperCase())}] ${chalk.blue(
                            content,
                        )}`,
                    ),
                );
            }
            case 'buttons': {
                return console.log(
                    chalk.blue(
                        `[${chalk.gray.bold(date)}]:[${chalk.black.bgGreenBright(type.toUpperCase())}] ${chalk.blue(
                            content,
                        )}`,
                    ),
                );
            }
            case 'modals': {
                return console.log(
                    chalk.blue(
                        `[${chalk.gray.bold(date)}]:[${chalk.black.bgGreenBright(type.toUpperCase())}] ${chalk.blue(
                            content,
                        )}`,
                    ),
                );
            }
            case 'events': {
                return console.log(
                    chalk.blue(
                        `[${chalk.gray.bold(date)}]:[${chalk.black.bgYellowBright(type.toUpperCase())}] ${chalk.blue(
                            content,
                        )}`,
                    ),
                );
            }
            case 'plugins': {
                return console.log(
                    chalk.blue(
                        `[${chalk.gray.bold(date)}]:[${chalk.black.bgCyan(type.toUpperCase())}] ${chalk.blue(content)}`,
                    ),
                );
            }
            case 'server': {
                return console.log(
                    chalk.blue(
                        `[${chalk.gray.bold(date)}]:[${chalk.black.bgCyan(type.toUpperCase())}] ${chalk.blue(content)}`,
                    ),
                );
            }
            case 'client': {
                return console.log(
                    chalk.blue(
                        `[${chalk.gray.bold(date)}]:[${chalk.black.magentaBright(type.toUpperCase())}] ${chalk.blue(
                            content,
                        )}`,
                    ),
                );
            }
            case 'database': {
                return console.log(
                    chalk.blue(
                        `[${chalk.gray.bold(date)}]:[${chalk.black.greenBright(type.toUpperCase())}] ${chalk.blue(
                            content,
                        )}`,
                    ),
                );
            }
            case 'error': {
                return console.log(
                    chalk.red(
                        `[${chalk.gray.bold(date)}]:[${chalk.black.bgGreenBright(
                            type.toUpperCase(),
                        )}] ${chalk.red.underline(content)}`,
                    ),
                );
            }
            default:
                throw new TypeError('Logger type must be either warn, debug, log, ready, cmd or error.');
        }
    }
}

module.exports = logger;
