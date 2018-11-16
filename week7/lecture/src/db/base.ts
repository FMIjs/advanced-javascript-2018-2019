import * as fs from 'fs';
import * as path from 'path';
import { IBaseEntity } from '../interfaces/base';

const db = Symbol('db');
const write = Symbol('write');
const filePath = Symbol('filePath');
const promiseData = Symbol('promiseData');
const shouldWrite = Symbol('shouldWrite');
const filterByQuery = Symbol('filterByQuery');

export class Base<T extends IBaseEntity> {
  [shouldWrite]: boolean = false;
  [promiseData]: { resolve: any, reject: any }[] = [];
  [db]: { entities: { [id: number]: T }, lastId: number } = { lastId: 0, entities: {} };
  [filePath]: string;

  constructor(name: string) {
    let content = null;

    this[shouldWrite] = false;
    this[promiseData] = [];
    this[filePath] = path.join(__dirname, '..', '..', '_db', name);

    try {
      content = JSON.parse(fs.readFileSync(this[filePath], { encoding: 'utf-8' }));
    } catch (e) {
      console.log(`Error opening file ${this[filePath]}.`);
      content = this[db];
    } finally {
      this[db].lastId = content.lastId;
      this[db].entities = content.entities;
    }
  }

  [filterByQuery](query: { [key: string]: any }, shouldIncluide = true) {
    let others: T[] = [];
    const filtered = Object.values(this[db].entities).filter(entity => {
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


  [write]() {
    if (!this[shouldWrite]) {
      this[shouldWrite] = true;
      process.nextTick(() => {
        fs.writeFile(this[filePath], JSON.stringify(this[db]), (err) => {
          this[promiseData].forEach(({ resolve, reject }) => {
            if (err) { reject(err); return; }
            resolve();
          });
          this[shouldWrite] = false;
          this[promiseData] = [];
        });
      });
    }

    return new Promise((resolve, reject) => {
      this[promiseData] = this[promiseData].concat({ resolve, reject });
    });
  }

  insert(entity: T) {
    const id = this[db].lastId + 1;
    entity = { id, ...(entity as any) };
    this[db].entities[id] = entity;
    this[db].lastId = id;

    return this[write]().then(() => entity).catch(err => {
      const { [id]: entity, ...others } = this[db].entities;
      this[db].entities = others;
      return Promise.reject(err);
    });
  }


  removeById(id: number) {
    const { [id]: entity, ...otherEntities } = this[db].entities;
    this[db].entities = otherEntities;
    return this[write]().then(() => {
      return entity;
    }).catch(err => {
      this[db].entities[id] = entity;
      return Promise.reject(err);
    });
  }

  getById(id: number) {
    return Promise.resolve(this[db].entities[id] || null);
  }

  get(query: { [key: string]: any }) {
    const { filtered } = this[filterByQuery](query, true);
    return Promise.resolve(Object.values(filtered));
  }

  getAll() {
    return Promise.resolve(Object.values(this[db].entities));
  }

  modify(query: { [key: string]: any }, updates: { [key: string]: any }) {
    const { filtered: matching, others: notMatching } = this[filterByQuery](query);
    const allUpdated: T[] = [];
    Object.values(matching).forEach(entity => {
      this[db].entities[entity.id] = { ...(entity as any), ...updates };
      allUpdated.push(this[db].entities[entity.id]);
    });
    return this[write]().then(() => {
      return allUpdated;
    }).catch(err => {
      Object.values(matching).forEach(entity => {
        this[db].entities[entity.id] = entity;
      });
      return Promise.reject(err);
    });
  }

  delete(query: { [key: string]: any }) {
    const { filtered: updatedEntities, others: deletedEntities } = this[filterByQuery](query, false);
    this[db].entities = updatedEntities;
    return this[write]().then(() => {
      return deletedEntities;
    }).catch(err => {
      deletedEntities.forEach(de => {
        this[db].entities[de.id] = de;
      })
      return Promise.reject(err);
    });
  }
}