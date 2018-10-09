// var obj = {
//   a: 'a',
//   b: 'b'
// };
// var arr = [
//   '1',
//   1,
//   [],
// ];
// var one = '1';
// var two = 2;
// var sum = function (a, b) {
//   return a + b;
// };
// function sum2(a, b) {
//   return a + b;
// };
// var a;


// function abv() {
//   var a, b, c;


// }

// console.log(a);
// a = 4;
// console.log(a);

// sum2();

// sum(1, 2);
// console.log(one === two);

function stepTwo() {
  console.log(12);
}

function stepOne() {
  console.log(11);
  setTimeout(stepTwo, 999);
}

setTimeout(stepOne, 1000);
console.log(0);