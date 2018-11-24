import * as express from 'express';
import * as path from 'path';

const publicFolderPath = path.join(__dirname, '..', 'public');

const app = express();
app.use(express.static(publicFolderPath));

app.get('/', (req, res) => {
  res.sendFile(path.join(publicFolderPath, 'index.html'));
});

app.listen(8080, () => {
  console.log('Server is listening on 8080');
});