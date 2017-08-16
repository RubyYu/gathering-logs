#!/usr/bin/env node
function run (conf) {
  const winston = require('winston');
  const harvester = require('./harvester').LogHarvester;

  conf.logging = new winston.Logger({
    transports: [ new winston.transports.Console({
      level: 'error'
    })]
  });
  new harvester(conf).run();
}

module.exports = {
  run
}