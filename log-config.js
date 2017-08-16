module.exports = {
  project: {
    default_project: [
      // {
      //   name: 'connector',
      //   path: '/data/logs/hermes-connector-v3s/',
      //   fileName: /^(\w+)\./
      // },
      // {
      //   name: 'connector-pm2',
      //   path: '/data/logs/pm2/Hermes-Connector-V3s/',
      //   fileName: /^(\w+)\.log$/
      // }
      {
        name: 'test',
        path: '/Users/wuwenyu/test_log/',
        fileName: /^(\w+)\./
      }
    ]
  },
  default_max_size: 1024 * 1024 * 1024,
  outPath: '/Users/wuwenyu/test_log/out/',
  nodeName: 'localhost',
  server: {
    host: '0.0.0.0',
    port: 28777
  }
}
