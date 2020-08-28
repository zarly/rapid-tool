
exports.getConfig = function getConfig (args) {
    const [task, method, apiPath] = args._;
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
