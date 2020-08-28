
exports.getConfig = function getConfig (args) {
    const method = args.method || args._[1];
    const apiPath = args.apiPath || args._[2];
    const apiPathDirs = apiPath.split('/').filter(it => it).map(it => it[0] === ':' ? ('_' + it.substr(1)) : it);
    const fileName = method + '_' + apiPathDirs[apiPathDirs.length - 1];
    apiPathDirs[apiPathDirs.length - 1] = fileName;
    const filePath = apiPathDirs.join('/');
    return {
        entities: [
            { input: './endpoint.ts.ejs', output: `@/src/endpoints/${filePath}.ts` },
            { input: './endpoint.test.ts.ejs', output: `@/src/endpoints/${filePath}.test.ts` },
        ],
        data () {
            return {
                ...args,
                method,
                apiPath,
                fileName,
                filePath,
            }
        }
    };
};
