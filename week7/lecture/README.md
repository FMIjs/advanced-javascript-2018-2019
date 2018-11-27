# Lecture 7

* Quality **API**'s
  * What is [**REST**](https://en.wikipedia.org/wiki/Representational_state_transfer)?
  * What is an [**API**](https://en.wikipedia.org/wiki/Application_programming_interface)?
  * The importance of writing good code
    * Readability
    * Function and variable naming
    * Separation of concerns
    * Some [literature](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)
  * HTTP Methods
    * **GET**
      * Most basic request
      * Shouldn't lead to changes in the servers / database
    * **POST**
      * Most used request
      * Frequently used for all operations < DON'T DO THAT
      * Used to send resources to the server
      * Used to modify resources on the server / database
    * **PUT**
      * Used to modify or update an entity
  * Web Sockets
    * not good for scaling
    * don't use them unless neccessary
    * don't use them to handle basic requests which can be handled by a REST API
  * Scaling
    * ...?
  * Caching
    * Another benefit of the REST API
    * What is caching?
    * Can specify when, what and how to cache resources
* Some more `Express`
  * Routers
  * More on templating
  * Why we can say this is _outdated_ (tempalates)
  * Single Page Apilacations
    * What?
    * Benefits?
* Databases
  * NoSQL vs SQL
  * Mongo
    * What
    * How
    * Why
    * Mongoose
  * Sequenize

* A deeper dive into the browser