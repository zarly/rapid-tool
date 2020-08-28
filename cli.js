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
    { name: 'crud', description: 'Создать новый CRUD' },
];

yargs
    .command(...getCommandArgs(commands[0]))
    .command(...getCommandArgs(commands[1]))
    .command(...getCommandArgs(commands[2]))
    .command(...getCommandArgs(commands[3]))
    .help()
    .argv;
