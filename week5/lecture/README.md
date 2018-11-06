# Week 5

* TypeScript

  * Basics
  * Compiling
  * Sourcemaps

    * `*.map.js`
    * Debugging in VS Code

* Modules

  * Package Managers

    * npm
    * yarn
  * Where to find packages?

    * GitHub
    * [NPM](https://www.npmjs.com/)

  * Installing (dev) modules
  * `package.json` > Information about the current project, its state and the dependencies
  * `.gitignore` > What not to commit to GitHub
  * `*.lock` > Accurate information about the installed dependancies

  * Exporting Modules

    * `export const a = ...;`
    * `export { a, b, ... };`
    * `export default a = ...;`

  * Importing Modules

    * `import * as myModule from 'myModule';`
    * `import { prop } from 'myModule';`
    * Rename imports: `import { prop as newName} from 'myModule';`
    * Importing default exports: `import prop from 'myModule';`
  
  * Creating our first [http](https://nodejs.org/api/http.html) server!

    * Getting started

      * `.createServer()` > create the server
      * `.listen()` > tell the server on which port to listen

    * Sending data to the user

      * `res.writeHead(200, { ... })`
      * `res.write('Hello')`

    * Handling different endpoints

      * All request get handled by `createServer` and call the given callback (`(req, res) => {}`)
      * Information about the requst is stored in the `req` argument

    * Make the whole thing easier ...

      * [Express](https://expressjs.com/)
      * [Hapi](https://hapijs.com/)