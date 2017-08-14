
/**
 * Module dependencies.
 */

const fs = require('fs')
  , stat = fs.statSync
  , open = fs.openSync
  , read = fs.readSync
  , close = fs.closeSync;

/**
 * Tail `len` of file `path`,
 * defaulting to 250 bytes.
 *
 * @param {String} path
 * @param {Number} len
 * @return {Buffer}
 * @api public
 */

module.exports = function(path, len){
  len = len || 250;
  let s = stat(path);
  let fd = open(path, 'r');
  len = Math.min(s.size, len);
  let off = Math.max(0, s.size - len);
  let buf = new Buffer(len);
  let n = read(fd, buf, 0, len, off);
  close(fd);
  return buf;
};
