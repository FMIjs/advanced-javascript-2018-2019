const prop = 'key';

// const obj = {
//   [prop]: 1
// };

// { key: 1 }
const entity = {
  id: 1,
  data: 2,
  [prop]: 1000
};

// delete entity.data;
// const { data, [prop]: something, ...myEntityWithoutData } = entity;

// const obj2 = {
//   a: undefined
// };

// const obj3 = {

// };
// console.log(obj2.a); // > undefined
// console.log(obj3.a); // > undefined
// Object.keys(obj2); // > ['a']
// Object.keys(obj3); // > []

const entityProxy = new Proxy(entity, {
  prop: [],
  get: function (target, key) {
    this.prop.push(key);
    if (key === 'select') {
      return this.prop;
    }
    return entityProxy;
  }
});

console.log(entityProxy.ad.sda.dsads.select);
// console.log(entityProxy.a);
// console.log(entityProxy.id);
// console.log(entityProxy.b);
// console.log(entityProxy.c);


// const sto = global.setTimeout;
// global.setTimeout = function (...args) {
//   return sto(...args);
// }


