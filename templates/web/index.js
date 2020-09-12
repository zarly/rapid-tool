
const path = require('path');

exports.getConfig = function getConfig (args) {
    const { name } = args;
    return {
        entities: [
            { cmd: `pwd` },
            { cmd: `mkdir -p ${name}` },
            { cmd: `cp -R ${path.resolve(__dirname, 'vue')}/. ./${name}` },
            { cmd: `tar -xvf ${path.resolve(__dirname, 'deps.tar.gz')} -C ./${name}` },
            { cmd: `cd ${name} && git init && git add . && git commit -m init && cd -` },
            { cmd: `cd ${name} && npm install` },
        ],
    };
};
