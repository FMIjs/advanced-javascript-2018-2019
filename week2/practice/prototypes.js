function Person(name, age) {
  this.age = age;
  this.getName = function () {
    return name;
  }
}

Person.prototype.sayHi = function () {
  console.log('Hello, my name is ' + this.getName());
}

function Employee(name, age, pos) {
  Person.call(this, name, age);
  this.pos = pos;
}

Employee.prototype = Object.create(Person.prototype);

var a = new Employee('Ivan', 20, 'neshto');
a.sayHi();
