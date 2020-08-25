
exports.getConfig = function getConfig (args) {
    const { name } = args;
    return {
        entities: [
            { input: './model.ts.ejs', output: `@/src/models/${name.snakeCase}.ts` },
            { input: './model.test.ts.ejs', output: `@/src/models/${name.snakeCase}.test.ts` },
        ],
        data (args) {
            return {
                ...args,
                tableName: args.name.snakeCase,
            }
        }
    };
};
