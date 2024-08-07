# СКУД СПРУТ Менеджер ключей

## Содержание

- [Платформы](#платформы)
- [Стек технологий](#стек-технологий)
- [Использование](#использование)
  - [Подготовка](#подготовка)
  - [Разработка](#разработка)
  - [Сборка](#сборка)

## Платформы

![PWA](https://img.shields.io/static/v1?style=for-the-badge&label=Web%20Application&message=PWA&logo=PWA&color=5a06c9&labelColor=white&logoColor=5a06c9)
![Windows](https://img.shields.io/static/v1?style=for-the-badge&label=Windows&message=11&logo=windows&color=037ac4&labelColor=white&logoColor=037ac4)
![Linux](https://img.shields.io/static/v1?style=for-the-badge&label=Linux&message=6.6.6&logo=linux&color=000000&labelColor=white&logoColor=000000)

## Стек технологий

[![Node](https://img.shields.io/static/v1?style=for-the-badge&label=Node&message=20.5.1&logo=Node.js&color=026e00&labelColor=white)](https://nodejs.org/en/)
[![npm](https://img.shields.io/static/v1?style=for-the-badge&label=npm&message=10.0.0&logo=npm&color=cb0000)](https://www.npmjs.com/)
[![Ionic](https://img.shields.io/static/v1?style=for-the-badge&label=Ionic&message=7.0.0&logo=Ionic&labelColor=white&color=176bff&logoColor=176bff)](https://ionicframework.com/)
[![React](https://img.shields.io/static/v1?style=for-the-badge&label=React&message=18.2.0&logo=React&labelColor=white&color=0074a6&logoColor=0074a6)](https://react.dev/)
[![RTK](https://img.shields.io/static/v1?style=for-the-badge&label=Redux%20Toolkit&message=1.9.7&logo=Redux&logoColor=593d88&labelColor=white&color=593d88)](https://redux-toolkit.js.org/)

## Использование

### Подготовка

Установите npm пакеты для Electron

```shell
cd electron && npm ci
```

### Разработка

#### WEB

```shell
npm run dev
```

#### Electron

```shell
npm run electron:start-live
```

### Сборка

#### PWA

```shell
npm run build
```

#### Windows

```shell
npm run electron:build:windows
```

#### Windows

```shell
npm run electron:build:linux
```
