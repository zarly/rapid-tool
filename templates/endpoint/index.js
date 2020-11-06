
exports.getConfig = function getConfig (args, cwd, utils) {
    const method = (args.method || (args._ && args._[1]) || '').toLowerCase();
    if (!method) throw new Error('Parameter "method" is not defined');

    const apiPath = args.apiPath || (args._ && args._[2]);
    if (!apiPath) throw new Error('Parameter "apiPath" is not defined');

    const prefix = args.prefix || '';
    const apiPathDirs = apiPath.split('/').filter(it => it).map(it => it[0] === ':' ? ('_' + it.substr(1)) : it);
    const fileName = method + '_' + apiPathDirs[apiPathDirs.length - 1];
    apiPathDirs[apiPathDirs.length - 1] = fileName;
    const filePath = ('@/src/endpoints/' + prefix + '/' + apiPathDirs.join('/')).replace(/[\/]+/, '/');
    return {
        entities: [
            { input: './endpoint.ts.ejs', output: `${filePath}.ts` },
            { input: './endpoint.test.ts.ejs', output: `${filePath}.test.ts` },
            utils.addScaffoldRecipieStep(args, 'endpoint'),
            utils.gitCommitCmd(args, 'add new endpoint'),
        ],
        data: {
            ...args,
            method,
            apiPath,
            fileName,
            filePath,
        },
    };
};
