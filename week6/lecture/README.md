# Week 6

## Express

* What is [`Express`](http://expressjs.com)
* Why use it?
* Basics
  * create the server
    * `const app = express()` > create the actual server
    * `app.listen(port, () => {})` > attach the server to a given port
  * handle a request
    * `app.[method](path, req, res)`
      * _method_ can be GET, POST, DELETE, PUT or any other [HTTP methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
      * _path_
        * specifies the path we want to handle ex: `/user`, `/submit`, etc.
        * can be a:
          * path string: `/user`
          * path pattern: `?`, `\*`, `+`, etc.
          * regex (but you can't use request params this way)
        * can have dynamic parameters
          * they allow us to handle multiple requests with the same base
          * specified by adding `:[param]` to the request, where param is the name by which we will access the value later
          * ex: `/user/:id`, `/company/:compId/user/:id`, etc.
      * `req` > holds information about the incoming request
        * `.query` > holds the url params (_`/test?param=1`_)
        * `.body` > holds the data sent via a POST request (need a way to parse it: `express.bodyParser`)
        * `.params` > holds the request params
        * `.cookies` > holds the sent cookies
      * `res` > stream which can be used to send back a response
        * `.send`
          * sends a response back
          * unlike `.write` from the http server we looked at last time can be called only once because it actually sends the response back
        * `.contentType` > information about the content (type, encoding, etc.)
    * `app.all(path, req, res)` > handler for all methods
* [Middlewares](https://expressjs.com/en/guide/using-middleware.html)
  * What?
    * functions that have access to the request object, the response object and next function in the stack
  * they can ...
    * Execute code
    * Make changes to the request and the response objects
    * End the request-response cycle
    * Call the next middleware or handler function in the stack
  * How?
    * `app.use(...)`
    * `app.<method>(path, middleware, (req, res) => {...})`
    * ...
  * Use Cases
    * Routing
    * Error Handling
    * Authentication
    * ...
  * Some [cool middlwares](https://github.com/rajikaimal/awesome-express#middleware)
* [Templating](https://expressjs.com/en/guide/using-template-engines.html)