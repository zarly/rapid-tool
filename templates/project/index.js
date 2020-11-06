
const path = require('path');

exports.getConfig = async function getConfig (args, cwd, utils) {
    const name = args.name;
    const dir = args.dir || args.name;
    const distAbsPath = path.resolve(cwd, dir, 'dist');
    
    return {
        entities: [
            { input: './files', output: `@/${dir}` },
            utils.initScaffoldRecipie(args, dir, 'project'),
            { 
                scaffold: path.resolve(__dirname, '..', 'api'),
                cwd: path.resolve(path.join(cwd, dir)),
                args: {
                    name: `${name}-api`,
                    dir: 'api',
                    description: 'API package',
                    inherited: true,
                },
            },
            { 
                scaffold: path.resolve(__dirname, '..', 'web-vue'),
                cwd: path.resolve(path.join(cwd, dir)),
                args: {
                    name: `${name}-web`,
                    dir: 'web',
                    description: 'Web Client package',
                    inherited: true,
                },
            },
            { 
                scaffold: path.resolve(__dirname, '..', 'web-vue'),
                cwd: path.resolve(path.join(cwd, dir)),
                args: {
                    name: `${name}-admin`,
                    dir: 'admin',
                    description: 'Web Admin package',
                    inherited: true,
                },
            },
            { 
                scaffold: path.resolve(__dirname, '..', 'web-svelte'),
                cwd: path.resolve(path.join(cwd, dir)),
                args: {
                    name: `${name}-lib`,
                    dir: 'lib',
                    description: 'Web Lib package',
                    inherited: true,
                },
            },
            utils.initDependencies(args,  dir, path.resolve(__dirname, 'deps.tar.gz')),
            utils.initCommitCmd(args, dir),
        ],
        data: {
            ...args,
            distAbsPath,
        },
    };
};
