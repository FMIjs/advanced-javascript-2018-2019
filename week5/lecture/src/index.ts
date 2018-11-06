import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';
import { IRouter } from './interfaces/router';

function parsePath(filePath: string = '') {
  return filePath.replace(/'|"/g, '');
}

function missingPathHandler(res: http.ServerResponse): void {
  res.writeHead(400, { 'Content-type': 'text/plain' });
  res.write('400 Bad request! Missing file path!');
  res.end();
}

const router: IRouter = {
  '/': (reqQuery, req, res) => {
    let filePath: string = parsePath(reqQuery['filePath']);
    if (filePath === '') { missingPathHandler(res); return; }
    filePath = path.join(__dirname, filePath);
    fs.readFile(filePath, function (err, content) {
      if (err) {
        res.writeHead(500, { 'Content-type': 'text/plain' });
        res.write(err.message);
        res.end();
        return;
      }
      res.writeHead(200, { 'Content-type': 'text/plain' });
      res.write(content);
      res.end();
    });
  },
  '/stream': (reqQuery, req: any, res: any) => {
    let filePath: string = parsePath(reqQuery['filePath']);
    if (filePath === '') { missingPathHandler(res); return; }
    filePath = path.join(__dirname, filePath);
    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
  },
  '/aa': (reqQuery, req: any, res: any) => {
    res.writeHead(200, { 'Content-type': 'text/plain' });
    res.write('Hello ');
    res.write('World. \nThis is /aa!');
    res.end();
  }
}

function pageNotFount(req: any, res: any) {
  res.writeHead(404, { 'Content-type': 'text/plain' });
  res.write('Page not found!');
  res.end();
}

const server = http.createServer(function (req, res) {
  const url = decodeURIComponent(req.url);
  const [, requestPath, requestQueryString = ''] = /([^\?]*)\??(.*)/.exec(url);
  const requestQuery = requestQueryString === '' ? {} : requestQueryString.split('&').reduce((acc: { [key: string]: string }, queryParam) => {
    const [key, value] = queryParam.split('=');
    acc[key] = value;
    return acc;
  }, {});
  (router[requestPath] || pageNotFount)(requestQuery, req, res);
});

server.listen(8080, function () {
  console.log('Listening on 8080');
});
