
const path = require('path');

exports.getConfig = function getConfig (args, cwd, utils) {
    const dir = args.dir || args.name;
    return {
        entities: [
            { input: './files', output: `@/${dir}` },
            utils.addScaffoldRecipieStep('web-vue'),
            utils.initDependencies(args,  dir, path.resolve(__dirname, 'deps.tar.gz')),
            utils.initCommitCmd(args, dir),
        ],
    };
};
