/**
 * Created by wuwenyu on 17/8/16.
 */
const config = require('../log-config')

function createLogConf (logObjs) {
  const _config = {
    nodeName:config.nodeName,
    logStreams: {},
    server: config.server
  }
  for (let logObj of logObjs) {
    _config.logStreams[logObj.name] = [
      logObj.path
    ]
  }
  return _config
}

module.exports = {
  createLogConf
}