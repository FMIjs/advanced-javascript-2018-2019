import * as express from 'express';
import * as path from 'path';

const publicFolderPath = path.join(__dirname, '..', 'public');

import * as db from './db';
import * as bodyParser from 'body-parser';

db.connect();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(publicFolderPath));

app.get('/', (req, res) => {
  res.sendFile(path.join(publicFolderPath, 'index.html'));
});


app.get('/user', (_, res) => {
  db.UserModel.find({}, (err, users) => {
    if (err) { return res.status(400).send(err.message); }
    res.send(users);
  })
});
app.get('/user/:id', (req, res) => {
  db.UserModel.findById(req.params.id, (err, users) => {
    if (err) { return res.status(400).send(err.message); }
    res.send(users);
  })
});

app.post('/user', (req, res) => {
  const { body } = req;

  const user = new db.UserModel(body);
  user.save((err, { _id }) => {
    if (err) { return res.status(400).send(err.message); }
    res.send(`User ${_id} created successfully!`);
  });
});

app.put('/user/:id', (req, res) => {
  const { body } = req;
  const { id } = req.params;
  if (!id) { res.status(400).send('Missing id!'); }
  db.UserModel.findById(id, (err, doc) => {
    if (err) { return res.status(400).send(err.message); }

    for (const key of Object.keys(db.UserModel.schema.obj)) {
      const updateValue = (body as any)[key];
      if (updateValue !== undefined) {
        doc.set(key, updateValue);
      }
    }

    if (!doc.isModified()) { return res.send('Nothing changed'); }

    doc.save((err, { _id }) => {
      if (err) { return res.status(400).send(err.message); }
      res.send(`User ${_id} updated successfully!`);
    });
  })
});

app.listen(8080, () => {
  console.log('Server is listening on 8080');
});