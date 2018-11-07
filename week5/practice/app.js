const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();

const port = 3000;
const defaultUrl = 'https://www.fmi.uni-sofia.bg/en/';


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/load', (req, res) => {
  https.get(req.query.url || defaultUrl, innerRes => {
    let data = '';
    innerRes.on('data', (chunk) => {
      data += chunk.toString();
    })
    innerRes.on('end', () => {
      res.send(data).end();
    });
  });
})

app.post('/load', (req, res) => {
  const { url } = req.body;
  https.get(url, innerRes => {
    let data = '';
    innerRes.on('data', (chunk) => {
      data += chunk.toString();
    })
    innerRes.on('end', () => {
      res.send(data).end();
    });
  });
});

app.get('/stream', (req, res) => {
  https.get(defaultUrl, innerRes => {
    innerRes.pipe(res);
  })
})

app.listen(port, function () {
  console.log(`Server listening on ${port}`);
});