#!/usr/bin/env node

const clc = require('cli-color');
const yargs = require('yargs');
const { runAction } = require('./index');

function saveTemplate (yargs) {
    console.log('yargs =', yargs);
}

function getCommandArgs (config) {
    return [config.name, config.description, function (yargs) {
        console.log(config.description);
        runAction({
            action: config.name, 
            params: yargs.argv,
        })
            .then(function () {
                console.log(clc.green.bold('Завершено успешно!'));
                process.exit(0);
            }).catch(function (error) {
                console.error(error);
                console.warn(clc.red.bold('Завершено с ошибками!'));
                process.exit(1);
            });
    }];
}

const commands = [
    { name: 'repo', description: 'Создать новый репозиторий' },
    { name: 'web-vue', description: 'Создать новый web-client на Vue' },
    { name: 'web-svelte', description: 'Создать новый web-client на Svelte' },
    { name: 'api', description: 'Создать новый API' },
    { name: 'endpoint', description: 'Создать новый метод API' },
    { name: 'datasource', description: 'Добавить новый источник данных' },
    { name: 'crud', description: 'Создать новый CRUD' },
    { name: 'telegram_bot', description: 'Скрипты для бота Телеграм' },
    { name: 'project', description: 'Создать новый проект' },
];

let arg = yargs
arg = arg.command('save', 'Сохранить шаблон', saveTemplate);
for (let i = 0; i < commands.length; i++) {
    arg = arg.command(...getCommandArgs(commands[i]));
}
arg.help().argv;
