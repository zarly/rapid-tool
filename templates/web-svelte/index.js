
const path = require('path');

exports.getConfig = function getConfig (args) {
    const dir = args.dir || args.name;
    return {
        entities: [
            { cmd: `mkdir -p ${dir}` },
            { input: './files', output: `@/${dir}` },
            { 
                json: `@/${dir}/.scaffold/recipe.json`,
                modify (json) {
                    json.init = {
                        command: 'web-svelte',
                        args: args,
                    };
                } 
            },
            { cmd: `tar -xvf ${path.resolve(__dirname, 'deps.tar.gz')} -C ./${dir}` },
            // { cmd: `cd ${dir} && git init && git add . && git commit -m init && cd -` },
        ],
    };
};
