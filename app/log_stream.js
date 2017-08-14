'use strict'
const fs = require('fs')
const readline = require('readline')
const child_process = require('child_process')

function LogStream (from, to) {
  this.from = from
  this.to = to
  this.start()
}

LogStream.prototype.start = function () {
  let superThis = this
  const p = child_process.spawn('tail', ['-f', this.from], {'stdio': [0, 'pipe', 0]})
  p.stdout.on('data', data => {
    fs.appendFileSync(superThis.to, data)
  })
}

module.exports = LogStream