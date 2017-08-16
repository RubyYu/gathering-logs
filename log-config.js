/**
 * Created by wuwenyu on 17/8/9.
 */
const OUT_PATH = ''
const DEFAULT_MAX_SIZE = 1024 * 1024 * 1024

const project = {
  default_project: [
    {
      name: 'connector',
      path: '/data/logs/hermes-connector-v3s/',
      fileName: /^(\w+)\./
    },
    {
      name: 'connector-pm2',
      path: '/data/logs/pm2/Hermes-Connector-V3s/',
      fileName: /^(\w+)\.log$/
    }
  ]
}

module.exports = {
  project,
  DEFAULT_MAX_SIZE,
  OUT_PATH
}
