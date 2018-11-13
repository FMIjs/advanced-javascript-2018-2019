# Упражнение 4

1. Напишете функция promisify, която взима един аргумент, който е асинхронна функция и връща Promise версията и.

    Пример:

    ```js
    const fs = require('fs');
    const promisify = require('./promisify');
    const readFile = promisify(fs.readFile);
    const writeFile = promisify(fs.writeFile);

    readFile('./data.txt')
      .then(content => content + ' more data')
      .then(data => writeFile('./data.txt', data))
      .then(() => console.log('Operation completed!'));
    ```

1. Използвайки кода от week3/practice преработете всички асинхронни операции с Promise-и.

    Пример:

    ```js
    const user = require('../db').user;

    Promise.all([
      user.insert({ name: 'Ivan', age: 21 }),
      user.insert({ name: 'Petar', age: 22 }),
      user.insert({ name: 'Todor', age: 23 })
    ]).then(() => user.get()).then(users => console.log(users));
    ```