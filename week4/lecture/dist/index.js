"use strict";
exports.__esModule = true;
var express = require("express");
var app = express();
function getHelloMessage(name) {
    return "Hello " + name + "!";
}
app.get('/', function (req, res) {
    var message = getHelloMessage('World');
    res.send(message).end();
});
app.listen(8080, function () {
    console.log('App is listening on 8080');
});
//# sourceMappingURL=index.js.map