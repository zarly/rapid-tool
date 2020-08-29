# Rapid Tool

Инструмент для генерации типового кода

## Установка

```
npm install -g rapid-tool
```

## Команды

```
rapid-tool repo - инициализировать новый NodeJS-проект
rapid-tool api - инициализировать новое API
rapid-tool endpoint - инициализировать новый метод API
rapid-tool crud - инициализировать новый CRUD
```

## Примеры

```
rapid-tool api --name my-new-project --description "My new project"
cd my-new-project
rapid-tool endpoint get hello
rapid-tool endpoint post guestbook
```
