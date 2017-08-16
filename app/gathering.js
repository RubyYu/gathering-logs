/**
 * Created by wuwenyu on 17/8/9.
 */

const config = require('../log-config')
const logio_gen = require('../log.io/logio_conf_generator')
const logio_harvester = require('../log.io/log.io-harvester')
const fs = require('fs')
const LogStream = require('./log_stream')
const projectName = process.env.PROJECT || 'default_project'
const OUT_PATH = config.outPath
const interval = 2000

const stream_map = {}

function launch () {
  let flag = true
  let file_arr = [] // 用于log.io的配置
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
        if (flag) {
          file_arr.push({
            name: `${c}_${f}`,
            path: outFilePath
          })
        }
      }
    }
    if (flag) {
      let _logioConf =logio_gen.createLogConf(file_arr)
      logio_harvester.run(_logioConf)
      flag = false
    }
  }, interval)
}

function get_newest_file () {
  let _config = config.project[projectName]
  let _fileClassify = {}
  for (let dir of _config) {
    let fileList = fs.readdirSync(dir.path)
    if (!dir.path.endsWith('/')) {
      dir.path += '/'
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