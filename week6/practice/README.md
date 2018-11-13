# Упражнение 6

Използвайки [`Express`](http://expressjs.com/en/starter/hello-world.html) да се създаде сървър, който да извършва [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) на потребители.

За база данни използвайте `Base` и `User Entity` от [предходните упражнения](https://github.com/FMIjs/advanced-javascript-2018-2019/tree/master/week4/practice).

Да се съдадат и следните екрани:

* User Create > съдържа форма (`<form>`), която `POST`-ва към `api/users`
* User Edit > съдържа форма (`<form>`), която `PUT`-ва към `api/users`
* User List > съдържа списък (`<ul><li>...</li></ul>`) от потребители, които `GET`-ва от `api/users`
