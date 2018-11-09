const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan');
const path = require('path');
const  fs = require('fs');

const userData = require('./users').userData;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({}));

app.use(morgan('common', {
    stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
}))

  
const mustacheExpress = require('mustache-express');

// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress());

app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
  res.render('home', {
    some: (req.query['some'] || '')
  })
})


app.get(/baba$/, (req, res) => {
    res.send("catching all babas  at the end of URL!")
})

app.use('/users?/:id', (req, res, next) => {
    console.log('Request URL:', req.originalUrl)
    next()
  }, (req, res, next) => {
    console.log('Request Type:', req.method)
    next()
  })

app.all('/users?/:id/:operation/', (req, res) => {
    const uid = req.params['id'];

    const ops = { 
        info: uid => 
            uid in userData.data && 
                res.render('userpage', {
                    uid: uid,
                    username: userData.data[uid].name
                })
        ,
        modify: uid => {
            uid in userData.data &&
                (userData.data[uid].name = req.body['name'])
            userData.save();
            res.redirect(`/users/${uid}/info`);
        }
    }

    const oper = req.params['operation'];
    oper in ops && ops[oper](uid);
})

app.use("/info2", (req, res, next) => {
    res.contentType('text/plain; charset=utf8');
    next();
})

app.all('/info2', (req, res) => {    
    res.render('serverinfo', {
        test: 'test',
        method: req.method,
        host: req.host,
        bodykeys: Object.keys(req.body),
        urlkeys: Object.keys(req.query),
        headers: () => 
            Object.keys(req.headers)
                .map(k => `${k} : ${req.headers[k]}` )
    });
})

app.all('/submit', (req, res) => {
    res.write(`
    *   method is: ${req.method}
    *   host is : ${req.host}
    *   body parameters are: ${Object.keys(req.body)}
    *   url params are : ${Object.keys(req.query)}        
    *   headers:${Object.keys(req.headers).map(k => `\t\t\t ${k} : ${req.headers[k]} \n` )}
    `)
    req.next()
});

app.all('/submit', (req, res) => {
    res.write('\n more content added here');
    res.end();
});

app.listen(3000)
