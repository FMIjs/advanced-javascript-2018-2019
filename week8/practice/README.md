# Упражнение 8

1. Модифицирайте сървъра от последното упражнение:
    * създайте [`mongoose`](https://mongoosejs.com/) / [`sequelize`](http://docs.sequelizejs.com/) модел / таблица `Users`.
    * Да се създадат и методи за извършване на CRUD операции.
    * Да се сервират статичните asset-и.
1. Създайте *custom element*, който да представлява форма за създаване / редактиране на потребител. Освен това:
    * Да се имплементира валидация на полетата.
    * Изпращането на заявки да се извършва чрез [`XMLHttpRequest`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest)

Bonus:

    *  Да се създаде `validation-error` копмонента, която да показва текст с дадена грешка, когато има такава. (_да се ползват_ [`slot`](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots)_-ове_)