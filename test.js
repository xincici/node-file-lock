const { resolve } = require('path');

const Locker = require('./');

const fp = resolve(__dirname, 'ttt');

(async() => {
  let lk;
  try {
    lk = new Locker(fp);
  } catch(e) {
    console.log('error occurd in 1');
    throw e;
  }
  await new Promise(res => setTimeout(res, 5000));
  lk.unlock();
})();

(async() => {
  let lk;
  try {
    lk = new Locker(fp);
  } catch(e) {
    console.log('error occurd in 2');
    throw e;
  }
  await new Promise(res => setTimeout(res, 5000));
  lk.unlock();
})();

