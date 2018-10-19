function curry(fn) {
  return function g() {
    var args = [].slice.call(arguments);
    if (args.length === fn.length) {
      return fn.apply(undefined, args);
    }
    return function () {
      var allArgs = args.concat([].slice.call(arguments));
      return g.apply(undefined, allArgs);
    }
  }
}

function sum(a, b) {
  return a + b;
}

function sum5(a, b, c, d, e) {
  return a + b + c + d + e;
}
// console.log(curry(sum)(1)(3));

console.log(curry(sum5)(1)()(3, 4)(5)(2));