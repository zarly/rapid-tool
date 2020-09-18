
const path = require('path');

exports.getConfig = function getConfig (args) {
    const dir = args.dir || args.dir;
    return {
        entities: [
            { cmd: `pwd` },
            { cmd: `mkdir -p ${dir}` },
            { cmd: `cd ${dir} && rapid-tool api --name "${name}-api" --dir "api" --description "API package"` },
            { cmd: `cd ${dir} && rapid-tool web-vue --name "${name}-web" --dir "web" --description "Web Client package"` },
            { cmd: `cd ${dir} && rapid-tool web-svelte --name "${name}-lib" --dir "lib" --description "Web Lib package"` },
        ],
    };
};
