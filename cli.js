#!/usr/bin/env node

const clc = require('cli-color');
const yargs = require('yargs');
const { runAction } = require('./index');

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
    { name: 'api', description: 'Создать новый API' },
    { name: 'endpoint', description: 'Создать новый метод API' },
    { name: 'datasource', description: 'Добавить новый источник данных' },
    { name: 'crud', description: 'Создать новый CRUD' },
];

let arg = yargs
for (let i = 0; i < commands.length; i++) {
    arg = arg.command(...getCommandArgs(commands[i]));
}
arg.help().argv;
