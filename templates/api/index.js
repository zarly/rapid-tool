
const path = require('path');

exports.getConfig = function getConfig (args) {
    const { name } = args;
    return {
        entities: [
            { cmd: `pwd` },
            { cmd: `mkdir -p ${name}` },
            { cmd: `cp -R ${path.resolve(__dirname, 'express')}/. ./${name}` },
            { cmd: `tar -xvf ${path.resolve(__dirname, 'deps.tar.gz')} -C ./${name}` },
            { input: './package.json.ejs', output: `@/${name}/package.json` },
            { input: './package-lock.json.ejs', output: `@/${name}/package-lock.json` },
        ],
    };
};
