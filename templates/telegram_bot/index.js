
exports.getConfig = function getConfig (args, cwd, utils) {
    const dir = './scripts/telegram';
    return {
        entities: [
            { input: './files', output: `@/${dir}` },
            utils.installPackages(args, 'axios'),
        ],
    };
};
