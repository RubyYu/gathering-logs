/**
 * Created by wuwenyu on 17/8/9.
 */
const OUT_PATH = ''

const project = {
  connectorv3s: [
    {
      name: 'connector',
      path: '/data/logs/hermes-connector-v3s/',
      fileName: /^(\w+)\./
    },
    {
      name: 'connector-pm2',
      path: '/data/logs/pm2/Hermes-Connector-V3s/',
      fileName: /^(\w+)\.log^/
    }
  ]
}

module.exports = {
  project,
  OUT_PATH
}
