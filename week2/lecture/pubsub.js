
var EventManager = function() {
    this.eventHandlers = {};
}

EventManager.prototype.on = function(evt, fun) {
    if (this.eventHandlers[evt] === undefined) {
        this.eventHandlers[evt] = []
    }
    return this.eventHandlers[evt].push(fun);
}

EventManager.prototype.off = function(evt, eid) {
    if (this.eventHandlers[evt] instanceof Array)
        this.eventHandlers[evt].splice(eid, 1)
}

EventManager.prototype.emit = function(evt) {
    var args = [].slice.call(arguments, 1);
    if (this.eventHandlers[evt]) {
        this.eventHandlers[evt].forEach(function(fn) {
            fn.apply(null, args) // ES6 : fn(...args)
        })
    }
}

var eman = new EventManager();
var eid = eman.on('example', function() {
    var args = [].slice.call(arguments);
    console.log("in event somevent, args: " + args.join(", "));
})

var eid = eman.on('example', function anon1 (a, b, c) {
    console.log("other in same event: " + [a, b, c]);
})

eman.emit('example', 1, 2, 3);
eman.off('example', eid);

// object literal
var obj = { 
    data: [ 1, 2, 3],
    fun: function(a, b, c) {
        this.data.push(a, b, c)
    },
    prn: function() {
        console.log(this.data)
    }
}

// classic constructor
var OClass =  function() {
    this.data = []

    // ES6 arrow function binds to correct this here :
    this.fun = (a, b, c) => {
        this.data.push(a, b, c)
    }
}

var obj2 = new OClass();

eman.on('example', obj.fun.bind(obj))
eman.on('example', function anon2() {
    obj.data.push(123)
})

eman.on('example', obj2.fun)
eman.emit('example', 6, 8, 6);

obj.prn();

