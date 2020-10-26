
const path = require('path');

exports.getConfig = async function getConfig (args, cwd) {
    const name = args.name;
    const dir = args.dir || args.name;
    const distAbsPath = path.resolve(cwd, dir, 'dist');
    
    return {
        entities: [
            { cmd: `mkdir -p ${dir}` },
            { input: './files', output: `@/${dir}` },
            { 
                json: `@/${dir}/.scaffold/recipe.json`, 
                modify (json) {
                    json.init = {
                        command: 'project',
                        args: args,
                    };
                } 
            },
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
                scaffold: path.resolve(__dirname, '..', 'web-vue'),
                cwd: path.resolve(path.join(cwd, dir)),
                args: {
                    name: `${name}-admin`,
                    dir: 'admin',
                    description: 'Web Admin package',
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
            { cmd: `tar -xvf ${path.resolve(__dirname, 'deps.tar.gz')} -C ./${dir}` },
            { cmd: `cd ${dir} && git init && git add . && git commit -m init && cd -` },
        ],
        data: {
            ...args,
            distAbsPath,
        },
    };
};
