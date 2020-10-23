
exports.getConfig = function getConfig (args) {
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
            { 
                json: `@/.scaffold/recipe.json`, 
                modify (json) {
                    json.updates.push({
                        command: 'endpoint',
                        args: args,
                    });
                } 
            },
            { cmd: `git add . && git commit -m "add new endpoint"` },
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
