
exports.getConfig = function getConfig (args) {
    const { name, datasource = 'default' } = args;
    return {
        entities: [
            { input: './api/get_.ts.ejs', output: `@/src/endpoints/${name.snakeCase}/get_.ts` },
            { input: './api/get__id.ts.ejs', output: `@/src/endpoints/${name.snakeCase}/get__id.ts` },
            { input: './api/post_.ts.ejs', output: `@/src/endpoints/${name.snakeCase}/post_.ts` },
            { input: './api/patch__id.ts.ejs', output: `@/src/endpoints/${name.snakeCase}/patch__id.ts` },
            { input: './api/delete__id.ts.ejs', output: `@/src/endpoints/${name.snakeCase}/delete__id.ts` },
            
            { input: './postgres-model.ts.ejs', output: `@/src/models/${name.snakeCase}.ts` },
            { input: './postgres-model.test.ts.ejs', output: `@/src/models/${name.snakeCase}.test.ts` },
        ],
        data () {
            return {
                ...args,
                tableName: `model_${args.name.snakeCase}`,
            }
        }
    };
};
