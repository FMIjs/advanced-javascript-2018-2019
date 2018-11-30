import * as http from 'http';
import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as io from 'socket.io';
import * as jwt from 'jsonwebtoken';
import * as cp from 'cookie-parser';

const publicFolderPath = path.join(__dirname, '..', 'public');

const app = express();
app.use(cp());
const server = http.createServer(app);

const ioSever = io(server);

ioSever.on('connection', (socket) => {
  socket.emit('event', 'Hello!');
  socket.on('something-happened', function (data) {
    console.log(data);
  });
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(publicFolderPath));
const users = [{ name: 'Ivan', email: 'ivan@abv.bg', password: '123' }]
let subscriptions: express.Response[] = [];

const secret = 'secret';

app.post('/login', function (req, res) {
  const { email, password } = req.body;

  const user = users.find(user => user.email === email);
  if (user.password === password) {
    const token = jwt.sign({ email }, secret);
    res.cookie('access-cookie', token, { httpOnly: true }).send(user);
  } else {
    res.send(400).end();
  }

});

function auth(req: express.Request, res: express.Response, next: express.NextFunction) {
  // const token = req.headers['access-token'] as string;
  const token = req.cookies['access-cookie'];
  jwt.verify(token, secret, function (err: Error, decoded: { email: string }) {
    if (err) {
      res.status(401).send('Not authorized!').end();
      return;
    }
    res.locals = {
      user: users.find(user => user.email === decoded.email)
    };

    next();
  });
}

app.get('/io', (req, res) => {
  res.sendFile('/Users/iliaidakiev/Documents/dev/advanced-javascript-2018-2019/week9/lecture/node_modules/socket.io-client/dist/socket.io.js');
});

app.post('/api/data', auth, function (req, res) {
  const { name, email, password } = req.body;
  users.push({ name, email, password });
  subscriptions.forEach(sub => sub.send(users).end())
  res.send(users).end();
})

app.get('/api/data', function (req, res) {
  res.send(users).end();
})

app.get('/api/subscribe', function (req, res) {
  const index = subscriptions.push(res) - 1;
  res.on('close', function () {
    subscriptions = [...subscriptions.slice(0, index), ...subscriptions.slice(index + 1)];
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(publicFolderPath, 'index.html'));
});

server.listen(8080, () => {
  console.log('Server is listening on 8080');
});