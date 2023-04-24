# Приложение React с базовым функционалом

## Авторизация

По умолчанию редирект на форму авторизации. Авторизация фейковая - срабатывает при клике на кнопку. Данные об авторизации сохраняються в localStorage. При выходе - удаляются.

## Роутинг

В приложении несколько страниц. Заглушка на случай ошибок, Логин, О сайте, Список постов и Пост.

## Кастомные хуки

Несколько хуков

- useFetching для получения данных и информировании о загрузке
- useObserver для бесконечной прокрутки
- usePosts для работы с постами - сортировка, фильтрация, поиск

## Контекст

Используется контекст - передает информацию об авторизации

## набор UI компонентов

Создал несколько базовых UI компонент, с возможностью переиспользования. Кнопка, поле ввода, лоадер, модальное окно, пагинация
