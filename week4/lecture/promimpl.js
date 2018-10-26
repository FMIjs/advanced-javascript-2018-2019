
function MyPromise(fun) {
    let obj = {
        cbs: [],
        res: function (val) {
            for (let cb of obj.cbs)
                cb(val);
        },
        rej: function () {
            console.error('failed promise');
        },
        then: function (cb) {
            obj.cbs.push(cb);
        }
    }

    fun(obj.res, obj.rej);

    return obj;
}

let prom = new MyPromise((res, rej) => {
    setTimeout(function () {
        res(100);
    }, 2000)
})

prom.then(function (res) {
    console.log(res);
})


////////////////////////////

const https = require('https');

const url1 = "https://www.w3.org/TR/PNG/iso_8859-1.txt";
const url2 = "https://www.w3.org/";

function asyncFun(url) {
    return new Promise((res, rej) => {
        https.get(url, res => {
            data = [];
            res.on('data', chunk => data.push(chunk))
            res.on('end', () => res(data))
            res.on('error', (err) => rej(err))
        })
    })
}

asyncFun(url1).then(val => {
    return new Promise((res, rej) => {
        res(val.join())
    });
}).then(val => {
    console.log(val)
    // throw new Error('BADD')
}).catch(err => {
    console.log(err)
    return 'more val YEAH'
}).then(val => {
    console.log('after exception handling')
});

// anonymous async function

(async () => {
    let res;

    try {
        res = await asyncFun(url2);
    } catch (err) {
        console.log(err)
    };

    console.log(`content length is : ${res.length}`);
})()


Promise.all([
    asyncFun(url1),
    asyncFun(url2)]).then(([r1, r2]) => {
        console.log('got all data from URLS')
    });

// function dada() {
//     return function(xyz) {
//         xyz(100)
//     }
// }

// dada()

// ((a) => console.log(a))(200)

//