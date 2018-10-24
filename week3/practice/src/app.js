const user = require('../db').user;

function logError(err) {
  console.error(err.message);
}

function partOne(cb) {
  user.insert({ name: 'Ivan', age: 20 }, function (err, insertedEntity) {
    if (err) { logError(err); return; }
    console.log('after insert: ', insertedEntity);

    user.getById(insertedEntity.id, function (err, sameUser) {
      if (err) { logError(err); return; }
      console.log('after get by id', sameUser);

      user.removeById(sameUser.id, function (err) {
        if (err) { logError(err); return; }

        user.getById(sameUser.id, function (err, notExistingUser) {
          if (err) { logError(err); return; }
          cb();
          console.log('after remove by id ', notExistingUser);
        });
      });
    });
  });
}

function partTwo() {
  user.insert({ name: 'Ivan', age: 20 }, function (err) {
    if (err) { logError(err); return; }
    user.insert({ name: 'Dragan', age: 21 }, function (err) {
      if (err) { logError(err); return; }
      user.insert({ name: 'Ivan', age: 22 }, function (err) {
        if (err) { logError(err); return; }
        user.get({ name: 'Ivan' }, function (err, users) {
          if (err) { logError(err); return; }
          console.log(users);
          user.delete({ name: 'Ivan' }, function (err) {
            if (err) { logError(err); return; }
            user.getAll(function (err, allUsers) {
              if (err) { logError(err); return; }
              console.log(allUsers)
            });
          });
        });
      });
    });
  });
}
partOne(partTwo);