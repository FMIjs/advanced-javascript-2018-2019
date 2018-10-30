const fs = require('fs');

function promisify(fn) {
  return function (...args) {
    return new Promise(function (resolve, reject) {
      fn(...args, function (err, result) {
        if (err) { reject(err); return; }
        resolve(result);
      })
    });
  };
}

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

readFile('./data.txt')
  .catch(err => {
    if (err.code === 'ENOENT') { return ''; }
    console.error(error);
    return Promise.reject(err);
  })
  .then(content => content + ' more data')
  .then(content => writeFile('./data.txt', content))

