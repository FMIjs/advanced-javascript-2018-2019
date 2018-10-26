import * as express from 'express';

const app = express();

// To run the project use "npm start" to compile the files into dist folder and run node ./dist/index.js
// or use VSC debugger launch confg

function getHelloMessage(name: string) {
  return `Hello ${name}!`;
}

app.get('/', (req, res) => {
  const message = getHelloMessage('World')
  res.send(message).end();
});

app.listen(8080, () => {
  console.log('App is listening on 8080');
});
