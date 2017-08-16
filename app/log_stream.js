'use strict'
const fs = require('fs')
const readline = require('readline')
const logConfig = require('../log-config')
const child_process = require('child_process')

const MAX_SIZE = logConfig.default_max_size

function LogStream (from, to) {
  this.from = from
  this.to = to
  this.start()
}

LogStream.prototype.start = function () {
  let superThis = this
  if (!fs.existsSync(superThis.to)) {
    fs.writeFileSync(superThis.to, '')
  }
  const p = child_process.spawn('tail', ['-f', this.from], {'stdio': [0, 'pipe', 0]})
  p.stdout.on('data', data => {
    if (~~(fs.statSync(superThis.to).size) >= MAX_SIZE) {
      fs.writeFileSync(superThis.to, '')
    }
    fs.appendFileSync(superThis.to, data)
  })
}

module.exports = LogStream