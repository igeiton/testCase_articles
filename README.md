ЕСЛИ API НЕ ПРОГРУЖАЕТСЯ, ТО ОБНОВИТЕ НЕСКОЛЬКО РАЗ (проблема с нагрузкой у хостинга)

    •	Авторизация и получение токена доступа:

Api: https://darkdes-django-t3b02.tw1.ru/api/v1/token/
Методы: POST
Комментарий: При успехе вернёт токен доступа типа Bearer, который нужно указывать в заголовке api, доступ к которым разрешён только для авторизованных пользователей.
Пример входных данных (body):
{
    "username": "test_task",
    "password": "123"
}
username – логин пользователя
password – пароль пользователя
Пример выходных данных при неправильном логине или пароле POST (body):
{
    "detail": "No active account found with the given credentials"
}
Пример выходных данных при успехе POST (body):
{
    "refresh": "test_refresh_token",
    "access": "test_access_token"
}
refresh – токен обновления токена доступа
access – токен доступа

    •	Обновление токена доступа:

API: https://darkdes-django-t3b02.tw1.ru/api/v1/token/refresh/
Методы: POST
Комментарий: У токена доступа есть время жизни, после его истечения, токен становится просроченным, данная api используется для его обновления
Пример входных данных POST (body):
{
    "refresh": " test_refresh_token"
}
refresh – токен обновления токена доступа
Пример выходных данных POST (body):
{
    "access": " test_access_token"
}
access – обновлённый токен доступа

    •	
    •	Изменение пароля:

API: https://darkdes-django-t3b02.tw1.ru/api/v1/change-password/
Методы: PUT
Комментарий: Доступно только авторизованному пользователю, нужно прокинуть jwt.
Пример входных данных PUT (body):
{
    "old_password": "123",
    "password": "123",
    "confirmed_password": "123"
}
old_password – старый пароль
password – новый пароль
confirmed_password – подтверждение нового пароля
Пример выходных данных при неправильном старом пароле PUT (body):
{
    "old_password": [
        "Wrong password."
    ]
}
Пример выходных данных при неправильно подтверждённом новом пароле PUT (body):
{
    "password": [
        "Password must be confirmed correctly."
    ]
}
Пример выходных данных при успехе PUT (body):
{
    "Success": true
}

    •	Регистрация

• Регистрация:
API: https://darkdes-django-t3b02.tw1.ru/api/v1/registration/
Методы: POST
Комментарий: При регистрации пользователей нужно добавить стандартные ограничения для пароля и логина.
Пример входных данных POST (body):
{
    "email": "test@task.com",
    "first_name": "Задание",
    "last_name": "Тестовое",
    "password": "test_task1234",
    "username": "test_task"
}
Пример выходных данных при использовании уже занятого логина POST (body):
{
    "username": [
        "A user with that username already exists."
    ]
}
Пример выходных данных при неправильном формате электронной почты (body):
{
    "email": [
        "Enter a valid email address."
    ]
}
Пример выходных данных при успехе POST (body):
{
    "user": {
        "id": 7,
        "last_name": " Тестовое",
        "first_name": " Задание",
        "username": "test_task",
        "email": "test@task.com"
    }
}

    •	Получение статей:

API: https://darkdes-django-t3b02.tw1.ru/api/v1/articles/
Методы: GET
Пример выходных данных при успехе:
[
{
"id": 8,
"author": {
"id": 5,
"username": "NatureLover22",
"email": "emily.smith@example.com"
},
"title": "Mental Health Awareness: Breaking the Stigma",
"slug": "mental-health-awareness-breaking-the-stigma",
"content": "Mental health awareness is crucial in addressing the stigma surrounding mental illness. Open conversations and education can help reduce misconceptions and promote understanding. Access to mental health resources and support is essential for those in need. Employers are recognizing the importance of mental well-being and implementing supportive policies. Community initiatives and advocacy play a vital role in fostering a culture of acceptance. By prioritizing mental health, we can create a more compassionate and inclusive society.",
"created": "2024-09-25T15:05:47.380598Z",
"updated": "2024-09-25T15:09:39.857386Z",
"image": "https://darkdes-django-t3b02.tw1.ru/media/media/Top_10_Travel_Destinations.jfif"
},
{
"id": 7,
"author": {
"id": 3,
"username": "TechGuru89",
"email": "alex.johnson@example.com"
},
"title": "The Impact of 5G Technology on Connectivity and Innovation",
"slug": "the-impact-of-5g-technology-on-connectivity-and-innovation",
"content": "5G technology is set to transform connectivity with its high-speed and low-latency capabilities. This advancement will enable innovations in various sectors, including smart cities, autonomous vehicles, and the Internet of Things (IoT). Businesses can leverage 5G to enhance operational efficiency and customer experiences. However, the rollout of 5G infrastructure requires significant investment and regulatory support. As 5G becomes more widespread, it will drive economic growth and technological advancements. The future of connectivity is faster and more interconnected than ever.",
"created": "2024-09-25T15:05:09.579292Z",
"updated": "2024-09-25T15:09:33.389885Z",
"image": "https://darkdes-django-t3b02.tw1.ru/media/media/Cybersecurity_Tips.jfif"
}
]

    •	Добавление статьи:

API: https://darkdes-django-t3b02.tw1.ru/api/v1/articles/
Методы: POST
Комментарий: Доступ разрешён только для авторизованных пользователей.Пример входных данных POST (body):
{
"title": "Title",
"content": "Content",
"image": null
}

OPTIONS:
{
    "POST": {
"title": {
"type": "string",
"required": true,
"read_only": false,
"label": "Title",
"max_length": 200
},
"content": {
"type": "string",
"required": true,
"read_only": false,
"label": "Content"
},
"image": {
"type": "image upload",
"required": false,
"read_only": false,
"label": "Image",
"max_length": 100
}
}
}

    •	Получение конкретной статьи, ее удаление и изменение

API: https://darkdes-django-t3b02.tw1.ru/api/v1/articles/<id>/
Методы: GET, PUT, PATCH, DELETE
Комментарий: Для PUT, PATCH, DELETE запросов доступ разрешён только для авторизованного пользователя, который эту статьи изначально создал. Доступ к конкретной статье по ее id.Пример входных данных PUT (body):
{
"title": "Title",
"content": "Content",
"image": null
}

OPTIONS:
{
"PUT": {
"title": {
"type": "string",
"required": true,
"read_only": false,
"label": "Title",
"max_length": 200
},
"content": {
"type": "string",
"required": true,
"read_only": false,
"label": "Content"
},
"image": {
"type": "image upload",
"required": false,
"read_only": false,
"label": "Image",
"max_length": 100
}
}
}

    •	Получение комментариев конкретной статьи.

API: https://darkdes-django-t3b02.tw1.ru/api/v1/articles/<id>/comments/
Методы: GET
Комментарий: Доступ к комментариям статьи по id статьи.Пример выходных данных при успехе:

[
{
"id": 1,
"author": {
"id": 3,
"username": "TechGuru89",
"email": "alex.johnson@example.com"
},
"content": "Great post!",
"created": "2024-09-25T15:12:07.516904Z",
"updated": "2024-09-25T15:12:07.516950Z",
"article": 1,
"parent": null,
"children": [
{
"id": 2,
"author": {
"id": 5,
"username": "NatureLover22",
"email": "emily.smith@example.com"
},
"content": "Agree!",
"created": "2024-09-25T15:12:46.690961Z",
"updated": "2024-09-25T15:12:46.691010Z",
"article": 1,
"parent": 1,
"children": [
{
"id": 3,
"author": {
"id": 6,
"username": "BookWorm77",
"email": "michael.brown@example.com"
},
"content": "Do not agree!",
"created": "2024-09-25T15:13:20.702855Z",
"updated": "2024-09-25T15:13:20.702900Z",
"article": 1,
"parent": 2,
"children": []
}
]
}
]
},
{
"id": 4,
"author": {
"id": 6,
"username": "BookWorm77",
"email": "michael.brown@example.com"
},
"content": "Like!",
"created": "2024-09-25T15:14:38.373975Z",
"updated": "2024-09-25T15:14:38.374041Z",
"article": 1,
"parent": null,
"children": []
}
]
}

    •	Добавление комментариев к конкретной статье:

API: https://darkdes-django-t3b02.tw1.ru/api/v1/articles/<id>/comments/
Методы: POST
Комментарий: Доступ разрешён только для авторизованных пользователей.Пример входных данных POST (body):
{
"content": "",
"parent": null
}

OPTIONS

"POST": {
"content": {
"type": "string",
"required": true,
"read_only": false,
"label": "Content"
},
"parent": {
"type": "field",
"required": false,
"read_only": false,
"label": "Parent"
}
}

    •	Получение конкретного комментария, его удаление и изменение:

API: https://darkdes-django-t3b02.tw1.ru/api/v1/articles/<id: article>/comments/<id: comment>/
Методы: GET, PUT, PATCH, DELETE
Комментарий: Для PUT, PATCH, DELETE запросов доступ разрешён только для авторизованного пользователя, который эту статьи изначально создал. Доступ к конкретному комментарию по id статьи, к которой он относится, и по его собственному id.

Пример входных данных PUT (body):

{
"content": "Great comment!"
}

OPTIONS

"actions": {
"PUT": {
"content": {
"type": "string",
"required": true,
"read_only": false,
"label": "Content"
}
}
}
