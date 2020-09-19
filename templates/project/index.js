
const path = require('path');
const util = require('util');
const { exec } = require('child_process');
const { rapidTool } = require('../../index');

const cmd = util.promisify(exec);

exports.getConfig = async function getConfig (args, cwd) {
    const name = args.name;
    const dir = args.dir || args.name;
    await cmd(`cd ${cwd} && pwd`);
    await cmd(`cd ${cwd} && mkdir -p ${dir}`);
    await rapidTool({
        cwd: path.resolve(path.join(cwd, dir)),
        action: 'api',
        params: {
            name: `${name}-api`,
            dir: 'api',
            description: 'API package',
        },
    });
    await rapidTool({
        cwd: path.resolve(path.join(cwd, dir)),
        action: 'web-vue',
        params: {
            name: `${name}-web`,
            dir: 'web',
            description: 'Web Client package',
        },
    });
    await rapidTool({
        cwd: path.resolve(path.join(cwd, dir)),
        action: 'web-svelte',
        params: {
            name: `${name}-lib`,
            dir: 'lib',
            description: 'Web Lib package',
        },
    });
    return {
        entities: [],
    };
};
