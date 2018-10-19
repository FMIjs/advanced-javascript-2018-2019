function compose() {
  var fns = Array.prototype.slice.call(arguments);
  return function () {
    var args = Array.prototype.slice.call(arguments);
    return fns.reduceRight(function (acc, curr) {
      return curr.apply(undefined, acc instanceof Array ? acc : [acc]);
    }, args);
  }
}

function sum(a, b) {
  return a + b;
}

function multiplyBy3(a) {
  return a * 3;
}

var addMultiply = compose(multiplyBy3, sum);

console.log(addMultiply(10, 29));


[1, 2, 3].reduce((acc, curr) => acc + curr, 0)