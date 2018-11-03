import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';

const router: { [key: string]: (req: any, res: any) => void } = {
  '/': (req: any, res: any) => {
    const [, , query] = /(.*)\?(.*)/.exec(decodeURIComponent(req.url));
    const [, filePath] = /filePath=\"(.*)\"/.exec(query);
    const dataPath = path.join(__dirname, filePath);

    fs.readFile(dataPath, function (err, content) {
      if (err) {
        res.writeHead(500, { 'Content-type': 'text' });
        res.write(err.message);
        res.end();
        return;
      }
      res.writeHead(200, { 'Content-type': 'text' });
      res.write(content);
      res.end();
    });
  },
  // '/stream': (req: any, res: any) => {
  //   // const readStream = fs.createReadStream(dataPath);
  //   // readStream.pipe(res);
  // },
  '/aa': (req: any, res: any) => {
    res.writeHead(200, { 'Content-type': 'text' });
    res.write('Hello ');
    res.write('World aaa!');
    res.end();
  }
}

function pageNotFount(req: any, res: any) {
  res.writeHead(404, { 'Content-type': 'text' });
  res.write('Page not found!');
  res.end();
}

const server = http.createServer(function (req, res) {
  const [, reqPath] = /(.*)\?/.exec(req.url);
  (router[reqPath] || pageNotFount)(req, res);
});

server.listen(8080, function () {
  console.log('Listening on 8080');
});
