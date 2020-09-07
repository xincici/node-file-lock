const { openSync, closeSync, ensureDirSync, removeSync } = require('fs-extra');
const os = require('os');

const { resolve } = require('path');

const tmpdir = os.tmpdir();
const lockdir = resolve(tmpdir, 'node-file-lock-dir');

removeSync(lockdir);
ensureDirSync(lockdir);

class Locker {
  constructor(filename, duration) {
    if (!filename) throw new Error('need filename param');
    filename = resolve(lockdir, filename.replace(/\//g, '_'));
    this.filename = filename;
    this.fd = openSync(this.filename, 'wx+');
    if (duration) {
      setTimeout(this.unlock.bind(this), duration);
    }
  }
  unlock() {
    closeSync(this.fd);
    removeSync(this.filename);
  }
}

module.exports = Locker;
