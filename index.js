const fs = require('fs');
const os = require('os');

const { resolve } = require('path');

const tmpdir = os.tmpdir();

class Locker {
  constructor(filepath, duration) {
    if (!filepath) throw new Error('need filepath param');
    if (!filepath.startsWith('/')) {
      filepath = resolve(tmpdir, filepath);
    }
    this.filepath = filepath;
    this.fd = fs.openSync(this.filepath, 'wx+');
    if (duration) {
      setTimeout(this.unlock.bind(this), duration);
    }
  }
  unlock() {
    fs.closeSync(this.fd);
    fs.unlinkSync(this.filepath);
  }
}

module.exports = Locker;
