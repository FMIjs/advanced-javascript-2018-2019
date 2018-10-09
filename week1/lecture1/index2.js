// var fs = require('fs');
// var content = '123';

// // fs.writeFileSync('./test', content);
// // console

// function aaa(b) {
//   var s = 5;
//   return function (c) {
//     console.log(b, c);
//   }
// }
// console.log(s);

// aaa(20)(20);

// fs.writeFile('./test', content, function afterWriteFileHandler(err) {
//   console.log(b);
//   if (err) {
//     console.error(err.message);
//     return;
//   };
//   fs.readFile('./test', { encoding: 'utf-8' }, function (err, data) {
//     if (err) {
//       console.error(err.message);
//       return;
//     }
//     console.log(data);
//   });
// });



var lib = (function () {

  function calculte() {

  }

  function calculte2() {
    let arraySlice = [].slice.bind(arguments);

    // console.log(arraySlice());
    // console.log([].slice.call(arguments, 0 ,1))
    console.log([].slice.apply(arguments, [0, 1]));
  }


  return {
    calculte: calculte2
  };
}());

lib.calculte(1, 2, 3, 4, {});



function Person(name, execFn) {
  this.name = name;
  this.execFn = execFn;
}

function Utl() {
  this.a = 10;
  this.myMethod = function () {
    console.log(this.a);
  };
}
var util = new Utl();

var ivan = new Person('Ivan', util.myMethod.bind(util));
ivan.execFn();