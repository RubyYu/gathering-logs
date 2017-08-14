/**
 * Created by wuwenyu on 17/8/10.
 */

const fs = require('fs')
const tail = require('./app/tail')
const readline = require('readline')

const from = '/Users/wuwenyu/test_log/error.2017-08-07-01.log'
fs.watch(from, {}, function (event, fileName) {
  if (event === 'change') {
    console.log(tail(from, 4).toString())
  }
})