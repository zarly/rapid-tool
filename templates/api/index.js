
const path = require('path');

exports.getConfig = function getConfig (args) {
    const dir = args.dir || args.dir;
    return {
        entities: [
            { cmd: `pwd` },
            { cmd: `mkdir -p ${dir}` },
            { cmd: `cp -R ${path.resolve(__dirname, 'express')}/. ./${dir}` },
            { cmd: `tar -xvf ${path.resolve(__dirname, 'deps.tar.gz')} -C ./${dir}` },
            { input: './.gitignore.ejs', output: `@/${dir}/.gitignore` },
            { input: './package.json.ejs', output: `@/${dir}/package.json` },
            { input: './package-lock.json.ejs', output: `@/${dir}/package-lock.json` },
            { cmd: `cd ${dir} && git init && git add . && git commit -m init && cd -` },
            { cmd: `cd ${dir} && npm install` },
        ],
    };
};
