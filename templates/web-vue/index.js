
const path = require('path');

exports.getConfig = function getConfig (args) {
    const dir = args.dir || args.name;
    return {
        entities: [
            { cmd: `pwd` },
            { cmd: `mkdir -p ${dir}` },
            { cmd: `cp -R ${path.resolve(__dirname, 'vue')}/. ./${dir}` },
            { input: './.gitignore.ejs', output: `@/${dir}/.gitignore` },
            { cmd: `tar -xvf ${path.resolve(__dirname, 'deps.tar.gz')} -C ./${dir}` },
            { cmd: `cd ${dir} && git init && git add . && git commit -m init && cd -` },
        ],
    };
};
