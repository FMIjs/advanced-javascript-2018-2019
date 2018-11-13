import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as methodOverride from 'method-override';

import { UserModel } from './db';

const port = 8080;

const app = express();

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

app.get('/', (req, res) => {
  UserModel.getAll().then(users => {
    res.render('pages/index', { users });
  });
});

app.get('/add', (req, res) => {
  res.render('pages/entity', { user: { name: '', age: '' } });
});

app.get('/edit/:id', (req, res) => {
  const id = +req.params.id
  UserModel.getById(id).then(user => {
    if (user === null) {
      res.render('pages/error', { message: '404 Page Not Found' })
    }
    res.render('pages/entity', { user });
  });
});

app.put('/api/users', (req, res) => {
  const { id, name, age } = req.body;
  if (!id || !name || !age) {
    res.status(400).render('pages/error', { message: '400 Bad Request' });
    return;
  }
  UserModel.modify({ id: +id }, { name, age }).then(() => {
    res.redirect('/');
  });
});

app.post('/api/users', (req, res) => {
  const { name, age } = req.body;
  if (!name || !age) {
    res.status(400).render('pages/error', { message: '404 Bad Request' })
  }

  UserModel.insert({ name, age }).then(() => {
    res.redirect('/');
  });
});

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});