const express = require('express');
const https = require('https')
const app = express();

const port = 3000;

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/load', function (req, res) {
  https.get('https://www.fmi.uni-sofia.bg/en/', (innerRes) => {
    let data = '';
    innerRes.on('data', (chunk) => {
      data += chunk.toString();
    })
    innerRes.on('end', () => {
      res.send(data).end();
    });
  })
})

app.listen(port, function () {
  console.log(`Server listening on ${port}`);
});