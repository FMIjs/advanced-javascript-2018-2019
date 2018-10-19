function sum(a, b) {
  console.log('calculate sum');
  return a + b;
}

// ES5
function memoize(func) {
  var cache = {};
  return function () {
    var key = JSON.stringify(arguments);
    var result = cache[key];
    if (!result) {
      result = func.apply(undefined, arguments);
      cache[key] = result;
    }
    return result;
  };
}

// ES6 
const memoize2 = func => {
  var cache = {};
  return (...args) => {
    var key = JSON.stringify(args);
    var result = cache[key];
    if (!result) {
      result = func(...args);
      cache[key] = result;
    }
    return result;
  }
}

var memoizedSum = oneLineMomoize(sum);
console.log(memoizedSum(1, 2)); // calculate and return result
console.log(memoizedSum(1, 2)); // return result only
