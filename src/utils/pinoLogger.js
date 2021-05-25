const pino = require('pino');

const pinoLogger = pino({
  prettyPrint: {
    colorize: true,
    ignore: 'pid,hostname,level,time',
  },
});

module.exports = pinoLogger;
