
exports.getConfig = function getConfig (args, cwd, utils) {
    args.name = args.name || 'default';
    args.type = args.type || 'postgres';
    const { name, type } = args;

    if (type === 'postgres') {
        return {
            entities: [
                // { cmd: 'npm i --save pg@8.3.3 && npm i -D @types/pg@7.14.4' },
                { input: './postgres.ts.ejs', output: `@/src/datasources/${name.snakeCase}.ts` },
                utils.addScaffoldRecipieStep(args, 'datasource'),
                utils.gitCommitCmd(args, 'add new datasource'),
            ],
        };
    } else if (type === 'memory') {
        return {
            entities: [
                { input: './memory.ts.ejs', output: `@/src/datasources/${name.snakeCase}.ts` },
                utils.addScaffoldRecipieStep(args, 'datasource'),
                utils.gitCommitCmd(args, 'add new datasource'),
            ],
        };
    } else {
        throw new Error('Unexpected type:', type);
    }
};
