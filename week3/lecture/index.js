'use strict';
console.log('Hello ES6!');
// ES6
// 1. var, let, const

// console.log(a);
// console.log(b); --> ERROR 'b is not defined'

var a = 5;
let b = 5;

const c = 5;
// c = 6; --> this throws an error
const constObj = {
  a: 5
};

constObj.a = 6;
// This is OK, because we aren't changing the reference
// console.log(constObj);

const constArr = [1];
constArr.push(5);
constArr.pop();
// console.log(constArr);


// 1.2 Frozen
Object.freeze(); // its properties can't be changed
const frozen = Object.freeze({
  prop: 1,
  complexProp: {
    prop: 1
  }
});

// console.log(frozen);
// frozen.prop = 2; // ERROR (if 'use strict' is enabled)
frozen.complexProp.prop = 2; // this still works though! No deep-freeze
// console.log(frozen.complexProp);


// 1.3 Block Scopes

// var - function scope
// let, const - block scope

if (1 === 1) {
  const a = 10;
  let b = 20;
}
{
  const a = 10;
}
for (let i = 0; i < 5; i++) {
  // this doesn't work with var!
  setTimeout(function () {
    // console.log(i);
  }, 1000);
}

// 1.4 Destructuring
const destObj = {
  prop1: 1,
  prop2: 2
};

const {
  prop2: newPropName,
  prop3 = 4 // default value, if property is missing;
} = destObj;
// console.log(newPropName);

// array destructuring
const destArr = [1, 2, 3];
const [, , el1] = destArr;

// from http://exploringjs.com/es6/ch_destructuring.html

const [all, year, month, day] =
  /^(\d\d\d\d)-(\d\d)-(\d\d)$/
    .exec('2999-12-31');

// console.log(el1);\\

let swapA = 1;
let swapB = 2;
let [swapC, swapD] = [swapA, swapB];
// console.log(swapC, swapD); ``

[swapB, swapA] = [swapA, swapB]; // Swap the values
// console.log(swapA, swapB);

// 1.5 Spread op

const spreadArr = [1, 2, 3, 4];
// console.log(spreadArr);
// console.log(...spreadArr);

function spreadTest1(a, b, c) {
  console.log(a);
  console.log(b);
  console.log(c);
}
// spreadTest1(...[1, 2, 3]);

const spreadObj1 = {
  a: 1,
  b: 2,
  c: 0
};
const spreadObj2 = {
  c: 3
};

// console.log({
//   ...spreadObj1,
//   ...spreadObj2
// });

// delete spreadObj1.a; --> Remove a prop from obj,  Slow op, avoid it
const deleteObj = {
  toDeleteProp: 0,
  a: 1,
  b: 2,
  c: 3
}

const { toDeleteProp, ...others } = deleteObj; // Faster way to remove a prop
// console.log(others);

const complexSpredObj = {
  compProp1: {
    a1: 10,
    b1: 2,
  },
  compProp2: {
    a2: 10,
    b2: 2
  },
  compProp3: {
    compCompProp: {
      a3: 10
    }
  }
}

// get the A's
const {
  compProp1: { a1 },
  compProp2: { a2 },
  compProp3: { compCompProp: { a3 } }
} = complexSpredObj;


// console.log(a1, a2, a3);


// 1.6 Generators

function asyncop(err, cb) {
  setTimeout(() => {
    // myself.next("This is result");
  }, 2000)
}

function opComplete(g) {
  return function (err, data) {
    g.next(data);
  };
}

function asyncfun(asyncop) {
  function* asyncgen(myself) {
    let res = yield asyncop(myself) // exec async function
    console.log(`my result is ${res}`)
  }

  let gen = asyncgen();
  gen.next(gen); // start the generator
}

asyncfun(asyncop);


function* gen2(genArg) { // add * to make it a generator!
  let counter = 0;
  while (true) {
    let val = yield counter;
    counter = counter + (val || 0);
  }
}
const numbers = gen2(2); // Create the generator, get it's iterator

// console.log(numbers.next()); // { value: 0, done: false }, Execute the func up to the first yield
// console.log(numbers.next(2));
// console.log(numbers.next(3));
// console.log(numbers.next(4));
// when have drained the generator the result will be { value: <last-value>, done: true }

// 1.7 Symbols

// const arr = [1, 2, 3];
// const arrIter = arr[Symbol.iterator];
// arrIter.next();


// Searches for existing symbols with the given key and returns it if found. 
// Otherwise a new symbol gets created in the global symbol registry with this key.
const mySymbol = Symbol.for('Hello');

Symbol.keyFor(mySymbol) // 'Hello'
// Retrieves a shared symbol key from the global symbol registry for the given symbol

// constants with symbols

const COLOR_RED = Symbol('Red');
const COLOR_ORANGE = Symbol('Orange');
const COLOR_YELLOW = Symbol('Yellow');
const COLOR_GREEN = Symbol('Green');
const COLOR_BLUE = Symbol('Blue');
const COLOR_VIOLET = Symbol('Violet');

function getComplement(color) {
  switch (color) {
    case COLOR_RED:
      return COLOR_GREEN;
    case COLOR_ORANGE:
      return COLOR_BLUE;
    case COLOR_YELLOW:
      return COLOR_VIOLET;
    case COLOR_GREEN:
      return COLOR_RED;
    case COLOR_BLUE:
      return COLOR_ORANGE;
    case COLOR_VIOLET:
      return COLOR_YELLOW;
    default:
      throw new Exception('Unknown color: ' + color);
  }
}

// iterator example with generator

class Collection {
  *[Symbol.iterator]() {
    var i = 0;
    while (this[i] !== undefined) {
      yield this[i];
      ++i;
    }
  }

}
var myCollection = new Collection();
myCollection[0] = 1;
myCollection[1] = 2;
for (var value of myCollection) {
  // console.log(value); // 1, then 2
}

// Custom Iterator
const obj = {
  stuff: [1, 2, 3],
  add: function (a) {
    this.stuff.push(a + 1);
  },
  [Symbol.iterator]: function* () {
    for (let i = 0; i < this.stuff.length; i++) {
      yield this.stuff[i];
    }
  }
}
const arr = [...obj];
// console.log(arr);

for (let i of obj) {
  // console.log(i);
}

//////////////////////////////////////////////////////////////////////

class MyMatcher {
  constructor(value) {
    this.value = value;
  }
  [Symbol.match](string) {
    var index = string.indexOf(this.value + this.value);
    if (index === -1) {
      return null;
    }
    return [this.value + this.value];
  }
}

// https://regex101.com/

var fooMatcher = 'foofoobar'.match(new MyMatcher('foo'));
var barMatcher = 'foobarbar'.match(new MyMatcher('bar'));

//////////////////////////////////////////////////////////////////////
const myObj = {
  [mySymbol]: 1000
};
// console.log(myObj[mySymbol]);

const myOtherSymbol = Symbol('my-other-symbol');
// console.log(Symbol.keyFor(myOtherSymbol)); // undefined

// Symbol.get('Hello');

// 1.8 Classes

class A {
  constructor(a) {
    this.a = a;
  }

  myMeth() {
    console.log(this.a);
  }
}

const classA = new A(1);
// classA.myMeth();

class B extends A {
  constructor(a, b) {
    super(a);
    this.b = b
  }
  mySecondMeth() {
    console.log(this.a, this.b);
  }
}
const classB = new B(1, 2);
// classB.mySecondMeth();

function Person(name) {
  this.name = name;
}

class Employee extends Person {
  constructor(name, position) {
    super(name);
    this.position = position;
  }

  sayHi() {
    console.log(`Hi! My name is ${this.name}, I'm a ${this.position}`);
  }
}

const ivan = new Employee('Ivan', 'Dev');
// ivan.sayHi();

// 1.9 Template literals

const tlName = 'Ivan';
const tlAge = 12;
// console.log('Hi! My name is' + tlName + 'I\'m tlAge');
// console.log(`Hi! My name is ${tlName}, I'm ${tlAge}`);

// Literals count newlines, tabs and etc.
const hi = `a

            a`;

// console.log(hi);

// 1.9.2 Tag Functions

function tagFn(strings, expressions) {
  // strings     --> all strings
  // expressions --> all template literal expressions 
  // console.log(strings, expressions);
}
tagFn`${1 + 2} test`;

// 1.10 Maps, WeakMaps

const mapObj = {
  name: 'Ivan'
}
const myMap = new Map();

myMap.set(mapObj, mapObj.name); // --> what to return when we get `mapObj`

console.log(myMap.get(mapObj)); // --> Ivan

const myWeakMap = new WeakMap(); // the property dissapears when the GC come
// Can prevent memory leaks!


const mySet = new Set([1, 2, 3]);
// console.log(mySet);

const myWeakSet = new WeakSet(); // Same concept

// 1.11 Lambda more

// Specifying parameters:

//     () => { ... } // no  parameter
//      x => { ... } // one parameter, an identifier
// (x, y) => { ... } // several parameters

// Specifying a body:

// x => { return x * x }  // block
// x => x * x  // expression, equivalent to previous line

// 1.12 Mixins (again)
// Horisontal composition
// A
// |
// B 
// C - C1 - C2  <-- C1 and C2 are Mixins

// console.log(Symbol('a') === Symbol('a')); // false
// console.log(Symbol.for('a') === Symbol.for('a')); // true

const symbolA = Symbol('a');
const symbolB = Symbol('a');

const symObj = {
  [symbolA]: 1,
  [symbolB]: 2
};
console.log(
  symObj[symbolA],
  symObj[symbolB]
); // 1, 2
