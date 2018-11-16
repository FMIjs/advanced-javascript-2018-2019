import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as methodOverride from 'method-override';
import { connectRouter } from './router';

const port = 8080;

const app = express();

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

connectRouter(app); // location is important!

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
