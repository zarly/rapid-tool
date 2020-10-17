
const path = require('path');

exports.getConfig = function getConfig (args) {
    const dir = args.dir || args.name;
    return {
        entities: [
            { cmd: `mkdir -p ${dir}` },
            { input: './vue', output: `@/${dir}` },
            { cmd: `tar -xvf ${path.resolve(__dirname, 'deps.tar.gz')} -C ./${dir}` },
            { cmd: `cd ${dir} && git init && git add . && git commit -m init && cd -` },
        ],
    };
};
