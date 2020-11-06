
exports.getConfig = function getConfig (args, cwd, utils) {
    const dir = args.name;
    return {
        entities: [
            { input: './files', output: `@/${dir}` },
            utils.initCommitCmd(args, dir),
        ],
    };
};
