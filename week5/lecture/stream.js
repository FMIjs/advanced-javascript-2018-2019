
const { pipeline, Readable, Writable, Transform } = require('stream');
const https  = require('https');

class MyWritable extends Writable {
    constructor(options) {
        super(options);

    }

    _write(chunk, encoding, callback) {
        console.log(chunk);
    }

}

class MyReadable extends Readable {
    constructor(options) {
        super(options);

        this.data = [
            "https://www.abv.bg",
            "https://www.mtv.com",
            "https://news.ycombinator.com",
            null
        ];

        this.cpos = 0;
 
        this.on('end', () => 
            console.debug('read stream ended!'))
    }

    _flush() {
        console.log('flushing transform!')
    }

    _read(chunk, encoding, callback) {
        this.push(this.data[this.cpos++]);

        console.debug(`${this.cpos} chunks passed via readable`);
        if (callback) return callback()
    }
}

class Xform extends Transform{
    constructor(options) {
        super(options)
        this.ccount = 0;

        this.on('finish', () => 
            console.debug('streaming ended!'))
    }

    _flush() {
        console.log('flushing transform!')
    }

    _transform(chunk, encoding, callback) {
        this.ccount++;
        console.debug(`${this.ccount} chunks passed via transport`);

        https.get(chunk.toString(), (res) => {

            res.on('data', data => 
                this.push(data))
            res.on('end', () => {
                if (callback) return callback()
            })
        })
    }
}

const rstr = new MyReadable();
// const wstr = new MyWritable();
const xform = new Xform();

// rstr.pipe(process.stdout);

pipeline(rstr, 
    xform, 
    process.stdout,
    (err) => {
        if (err) {
          console.error('Pipeline failed', err);
        } else {
          console.log('Pipeline succeeded');
        }
      } 
    )

// rstr.pipe(xform);
// xform.pipe(process.stdout);
