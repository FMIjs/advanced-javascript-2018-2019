const Base = require('./base');

function User() {
  Base.call(this, 'users.db');
}

User.prototype = Object.create(Base.prototype);

module.exports = User;