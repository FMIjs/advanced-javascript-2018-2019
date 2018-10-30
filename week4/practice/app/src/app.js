const user = require('../db').user;

Promise.all([
  user.insert({ name: 'Test1', age: 21 }),
  user.insert({ name: 'Test2', age: 22 }),
  user.insert({ name: 'Test3', age: 23 }),
  user.insert({ name: 'Test4', age: 24 }),
  user.insert({ name: 'Test5', age: 25 })
]).then(() => user.get({ age: 25 })).then(console.log);