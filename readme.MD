## WHAT IS THIS ##

Just a file system based lock, to avoid multi process Node application(such as pm2) make problems while operating the file system.

## USAGE ##

```js
const Locker = require('node-file-lock');

(async() => {
  // only the first Locker(file) will success, others with the same file param call will throw error
  const lock = new Locker('custom-your-specified-file-name');

  // do the async download and fs operating stuff here use await
  // codes between lock and unlock will not be executed in parallel between multiple processes
  // only the first process will execute this part of the code, others will throw an error at the previous line of code

  // unlock the locker, then other process can do the same thing now
  lock.unlock();
})();
```

```js
// support the second param, duration in milliseconds, which will make the lock auto-release after the duration exceed
const lock = new Locker('custom-your-specified-file-name', 3000);
const unlock = lock.unlock.bind(lock);

// do the async download and fs operating stuff here

new Promise((res, rej) => {
  // codes here
})
  .then(unlock, unlock);
```