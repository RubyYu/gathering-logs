/**
 * Created by wuwenyu on 17/8/9.
 */

const config = require('../log-config')
const fs = require('fs')
const LogStream = require('./log_stream')
const projectName = process.env.PROJECT || 'test'
const OUT_PATH = '/Users/wuwenyu/test_log/out/'
const interval = 2000

const stream_map = {}

function launch () {
  setInterval(() => {
    let list = get_newest_file()
    for (let c in list) {
      if (!list.hasOwnProperty(c)) continue
      if (!fs.existsSync(OUT_PATH+c)) {
        fs.mkdirSync(OUT_PATH+c)
      }
      for (let f in list[c]) {
        if (!list[c].hasOwnProperty(f)) continue
        let outFilePath = `${OUT_PATH}${c}/${f}.log`
        if (!stream_map[outFilePath] || stream_map[outFilePath]['path'] !== list[c][f].path){
          delete stream_map[outFilePath]
          stream_map[outFilePath] = {
            path: list[c][f].path,
            stream: new LogStream(list[c][f].path, outFilePath)
          }
        }
      }
    }
  }, interval)
}

function get_newest_file () {
  let _config = config[projectName]
  let _fileClassify = {}
  for (let dir of _config) {
    let fileList = fs.readdirSync(dir.path)
    if (!dir.path.endsWith('/')) {
      throw new Error('Log path must be end of "/" !')
    }
    let newest = {}
    for (let fileName of fileList) {
      let res = fileName.match(dir.fileName, 'g')
      if (res === null) continue
      let classify = res[1]
      let fileInfo = fs.statSync(dir.path + fileName)
      if (!newest[classify] || fileInfo.ctime > newest[classify].ctime){
        newest[classify] = {ctime: fileInfo.ctime, path: dir.path + fileName}
      }
    }
    _fileClassify[dir.name] = newest
  }
  return _fileClassify
}

module.exports = {
  launch
}