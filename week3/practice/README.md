# Упражнение 3

1. Създайте конструктор функция `Base`, която получава един аргумент `fileName`. `fileName` се използва за идентификация на файлва от който ще се чете или пише в зависимост от операцията. Вътрешно `Base` трябва да пази копие на всички записи и последното използвано id. Също така `Base` трябва да има следните методи: 
    * instert(entity) - създаване на ново id и записване на нова стойност 
    * deleteById(entity.id) - изтриване на стойност по зададено id
    * getById(entity.id) - връщане на стойност по дадено id

2. Използвайки класическо прототипно наследяване и направете конструктор функя User, която наследява функционалността на Base и ви дава възможност да записвате, четете и изтривате потребители.
    Пример:
    ```js
    User.insert({ name: 'Ivan', age: 20 }, function (err, myUser) {
        User.getById(myUser.id, function(err, sameUser) {
            User.deleteById(sameUser.id, function(err) {
                User.getById(myUser.id, function(err, notExistingUser) {
                    console.log(notExistingUser); // > null
                });
            });
        });
    });
    ```
3. Допълнете get и delete към `Base`, които изпозват query. 
    Пример:
    ```js
    User.insert({ name: 'Ivan', age: 20 }, function (err, user) {
        User.insert({ name: 'Ivan', age: 30 }, function(err, sameUser) {
            const ivanUsers = User.get({ name: 'Ivan' }, function(err, ivanUsers) {
                console.log(ivanUsers); // > [{ name: 'Ivan', age: 20 }, { name: 'Ivan', age: 30 }] 
            });
        });
    });
    
    ```