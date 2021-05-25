const pino = require('pino');
const listEndpoints = require('express-list-endpoints');

const pinoLogger = pino({
  prettyPrint: {
    colorize: true,
    ignore: 'pid,hostname,level,time',
  },
});

const logWithPino = app => {
  listEndpoints(app).forEach(endpoint => {
    if (endpoint.methods.length > 1) {
      endpoint.methods.forEach(meth => {
        pinoLogger.info(`[${meth}] ${endpoint.path}`);
      });
    } else {
      pinoLogger.info(`[${endpoint.methods[0]}] ${endpoint.path}`);
    }
  });
};

module.exports = logWithPino;
