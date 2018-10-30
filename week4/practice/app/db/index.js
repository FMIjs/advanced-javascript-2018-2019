const fs = require('fs');
const path = require('path');
const User = require('./user');
const dbDirectoryPath = path.join(__dirname, '_db');

if (!fs.existsSync(dbDirectoryPath)) {
  fs.mkdirSync(dbDirectoryPath);
}

module.exports.user = new User();