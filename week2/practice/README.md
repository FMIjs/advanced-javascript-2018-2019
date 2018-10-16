# Упражнение 2

1. Напишете фунцкия `memoize`, която изпълнените до момента резултати на дадена функция, в зависимост от подадените аргументи. Т.е. ако при подаване на същите аргументи, тя директно връща резултат.

    Пример:

    ```js
    var sum = function (x, y) { return x + y; }
    console.log(memoize(sum)(2,3)); // пресмята, връща 5
    console.log(memoize(sum)(3,3)); // пресмята, връща 6
    console.log(memoize(sum)(2,3)); // директно връща 5 без да смята
    ```

2. Напишете функция `curry`, която взима дадена функция f като аргумент и ни връща нова функция, чрез която частично можем да прилагаме f.

    Пример:

    ```js
    function trippleAdd(a, b, c) {
        return a + b + c;
    }

    cTrippleAdd = curry(trippleAdd);

    console.log(cTrippleAdd(1)(2)(3)); //6
    console.log(cTrippleAdd(1, 2)(3)); //6
    console.log(cTrippleAdd(1, 2, 3)); //6
    ```

3. Напишете функция `compose` която ни прави композиция от n на брой функции.

    Пример:

    ```js
    var addOne = (x) => x + 1;
    var sqrt = (x) => x * x;
    var log = (x) => console.log(x);

    addOneSqrtAndPrint = compose(log, sqrt, addOne);

    addOneSqrtAndPrint(1); // 4
    ```