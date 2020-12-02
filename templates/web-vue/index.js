
const path = require('path');

exports.getConfig = function getConfig (args, cwd, utils) {
    const dir = args.dir || args.name;
    args.appPort = args.appPort || 8080;
    args.appPath = args.appPath || '/';
    args.defaultTitle = args.defaultTitle || 'rapid client';
    return {
        entities: [
            { input: './files', output: `@/${dir}` },
            utils.addScaffoldRecipieStep(args, 'web-vue'),
            utils.initDependencies(args,  dir, path.resolve(__dirname, 'deps.tar.gz')),
            utils.initCommitCmd(args, dir),
        ],
    };
};
