const fs = require('fs');
const path = require('path');

function Base(name) {
  let content = null;

  this.db = {};
  this.filePath = path.join(__dirname, '_db', name);

  try {
    content = JSON.parse(fs.readFileSync(this.filePath, { encoding: 'utf-8' }));
    // check if structure is correct
  } catch (e) {
    console.log(`Error opening file ${this.filePath}.`);
    content = { lastId: 0, entities: {} };
  } finally {
    this.db.lastId = content.lastId;
    this.db.entities = content.entities;
  }
}

Base.prototype._filterByQuery = function (query, shouldIncluide = true) {
  return Object.values(this.db.entities).filter(entity => {
    let match = true;
    for (let [field, value] of Object.entries(query)) {
      match = match && entity[field] === value;
    }
    return shouldIncluide ? match : !match;
  })
}

Base.prototype._writeEntities = function (entities, ...args) {
  const cb = args[args.length - 1];
  const lastId = args[args.length - 2] || this.db.lastId;
  fs.writeFile(this.filePath, JSON.stringify({ lastId, entities }), cb);
}

Base.prototype.insert = function (entity, cb) {
  const id = this.db.lastId + 1;
  entity = { id, ...entity };
  const dbCopy = {
    entities: {
      ...this.db.entities,
      [id]: entity
    },
    lastId: id
  };

  this._writeEntities(dbCopy.entities, id, function (err) {
    if (err) { cb(err); return }
    this.db = dbCopy;
    cb(null, entity);
  }.bind(this));
}

Base.prototype.removeById = function (id, cb) {
  const updatedEntities = Object.keys(this.db.entities).reduce((acc, currentId) => {
    if (parseInt(currentId) === parseInt(id)) { return acc; }
    acc[currentId] = this.db.entities[currentId];
    return acc;
  }, {});

  this._writeEntities(updatedEntities, err => {
    if (err) { cb(err); return; }
    this.db.entities = updatedEntities;
    cb(null);
  });
}

Base.prototype.getById = function (id, cb) {
  cb(null, this.db.entities[id] || null);
}

Base.prototype.get = function (query, cb) { // { name: 'Ivan' }
  cb(null, this._filterByQuery(query));
}

Base.prototype.getAll = function (cb) {
  cb(null, Object.values(this.db.entities));
}

Base.prototype.delete = function (query, cb) {
  const updatedEntities = this._filterByQuery(query, false);
  this._writeEntities(updatedEntities, err => {
    if (err) { cb(err); return; }
    this.db.entities = updatedEntities;
    cb(null);
  });
}

module.exports = Base;