const fs = require('fs');
const path = require('path');

function Base(name) {
  let content = null;

  this.shouldWrite = false;
  this.promiseData = [];
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
  let others = [];
  const filtered = Object.values(this.db.entities).filter(entity => {
    let match = true;
    for (let [field, value] of Object.entries(query)) {
      match = match && entity[field] === value;
    }
    const result = shouldIncluide ? match : !match;
    if (!result) { others = others.concat(entity); }
    return result;
  });
  return { others, filtered };
}

Base.prototype._write = function () {
  if (!this.shouldWrite) {
    this.shouldWrite = true;
    process.nextTick(() => {
      fs.writeFile(this.filePath, JSON.stringify(this.db), (err) => {
        this.promiseData.forEach(({ resolve, reject }) => {
          if (err) { reject(err); return; }
          resolve();
        });
        this.shouldWrite = false;
        this.promiseData = [];
      });
    });
  }

  return new Promise((resolve, reject) => {
    this.promiseData = this.promiseData.concat({ resolve, reject });
  });
}

Base.prototype.insert = function (entity) {
  const id = this.db.lastId + 1;
  entity = { id, ...entity };
  this.db.entities[id] = entity;
  this.db.lastId = id;

  return this._write().then(() => entity).catch(err => {
    const { [id]: entity, ...others } = this.db.entities;
    this.db.entities = others;
    return Promise.reject(err);
  });
}

Base.prototype.removeById = function (id) {
  const { [id]: entity, ...otherEntities } = this.db.entities;
  this.db.entities = otherEntities;
  return this._write().then(() => {
    this.db.entities = updatedEntities;
    return entity;
  }).catch(err => {
    this.db.entities[id] = entity;
    return Promise.reject(err);
  });
}

Base.prototype.getById = function (id) {
  return Promise.resolve(this.db.entities[id] || null);
}

Base.prototype.get = function (query) {
  const { filtered } = this._filterByQuery(query, true);
  return Promise.resolve(Object.values(filtered));
}

Base.prototype.getAll = function () {
  return Promise.resolve(Object.values(this.db.entities));
}

Base.prototype.delete = function (query) {
  const { filtered: updatedEntities, others: deletedEntities } = this._filterByQuery(query, false);
  this.db.entities = updatedEntities;
  return this._write().then(() => {
    this.db.entities = updatedEntities;
    return deletedEntities;
  }).catch(err => {
    deletedEntities.forEach(de => {
      this.db[de.id] = de;
    })
    return Promise.reject(err);
  });
}

module.exports = Base;