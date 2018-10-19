// var ivan2 = {
//   name: 'Ivan2',
//   age: 20
// }

// // console.log(obj.prop);

// function Person(name, age) {
//   this.name = name;
//   this.age = age;
//   this.myMethod2 = function (a, b) {

//   }.bind(this);

// }



// var obj2 = {
//   arg1: '10',
//   prop: () => {
//     return this.arg1;
//   }
// }


// Person.prototype.myMethod = function () {
//   console.log('neshto');
// };

// function Employee(name, age, position) {
//   var count = 0;
//   Person.call(this, name, age);
//   this.position = position;
//   this.getCount = function () {
//     return count;
//   }
//   this.incCount = function () {
//     count++;
//   }
// }


// // Person.prototype = {
// //   getName: function () {
// //     return this.name;
// //   }
// // }
// Employee.prototype = Object.create(Person.prototype);
// // Employee.prototype = Person.prototype;
// Employee.prototype.sayHi = function () {
//   console.log('Hi!');
// }

// Employee.prototype.myMethod = function () {
//   console.log('neshto drugo');
// };

// // ivan <---> Person.prototype

// // var ivan = new Person('Ivan', 20);
// var ivan = new Employee('Ivan', 20, 'manager');
// ivan.count++;
// console.log(ivan.getName());

// Object.defineProperties(ivan, {
//   name: {
//     get: function () {
//       return 4;
//     }

//   }
// });
// ivan.name = 10;
// Person.prototype.myMethod.call(ivan);

// var numbers = [1, 2, 3, 4];

// function addNumber(arr, number) {
//   return arr.concat(number);
// }

// function sum(a, b) {
//   return a + b;
// }
// sum(1, 3);

// function curry(fn) {

// }

// var curriedSum = curry(sum);
// var addOne = sum(1);
// addOne(5);

// // function curriedSum(a) {
// //   return function (b) {
// //     return a + b;
// //   }
// // }

// sum(1)(3);

for (var i = 0; i < 5; i++) {
  setTimeout((function (num) {
    return function () {
      console.log(num);
    }
  }(i)), 1000);
}

// for (var i = 0; i < 5; i++) {
//   setTimeout(function (a) {
//     console.log(a);
//   }.bind(null, i), 1000);
// }

for (var i = 0; i < 5; i++) {
  setTimeout(console.log.bind(null, i), 1000 * i);
}