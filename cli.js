#!/usr/bin/env node

const path = require('path');
const scaffold = require('easy-scaffold');
const clc = require('cli-color');
const yargs = require('yargs');

function getCommandArgs (config) {
    return [config.name, config.description, function (yargs) {
        console.log(config.description);
        scaffold(path.resolve(__dirname, 'templates', config.name), yargs.argv)
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
];

yargs
    .command(...getCommandArgs(commands[0]))
    .help()
    .argv;
