var winston = require('winston');
var moment = require('moment');

var logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)({ timestamp: function() { return moment().format(); } })
    ]
  });

module.exports = logger;