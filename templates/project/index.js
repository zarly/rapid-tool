
const path = require('path');

exports.getConfig = async function getConfig (args, cwd) {
    const name = args.name;
    const dir = args.dir || args.name;
    
    return {
        entities: [
            { cmd: `mkdir -p ${dir}` },
            { 
                scaffold: path.resolve(__dirname, '..', 'api'),
                cwd: path.resolve(path.join(cwd, dir)),
                args: {
                    name: `${name}-api`,
                    dir: 'api',
                    description: 'API package',
                },
            },
            { 
                scaffold: path.resolve(__dirname, '..', 'web-vue'),
                cwd: path.resolve(path.join(cwd, dir)),
                args: {
                    name: `${name}-web`,
                    dir: 'web',
                    description: 'Web Client package',
                },
            },
            { 
                scaffold: path.resolve(__dirname, '..', 'web-svelte'),
                cwd: path.resolve(path.join(cwd, dir)),
                args: {
                    name: `${name}-lib`,
                    dir: 'lib',
                    description: 'Web Lib package',
                },
            },
        ],
    };
};
