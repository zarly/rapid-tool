
exports.getConfig = function getConfig (args) {
    const { name } = args;
    return {
        entities: [
            { input: './api/get_.ejs', output: `@/src/endpoints/${name.snakeCase}/get_.ts` },
            { input: './api/get__id.ejs', output: `@/src/endpoints/${name.snakeCase}/get__id.ts` },
            { input: './api/post_.ejs', output: `@/src/endpoints/${name.snakeCase}/post_.ts` },
            { input: './api/patch__id.ejs', output: `@/src/endpoints/${name.snakeCase}/patch__id.ts` },
            { input: './api/delete__id.ejs', output: `@/src/endpoints/${name.snakeCase}/delete__id.ts` },
            
            { cmd: 'npm i --save pg@8.3.3 && npm i -D @types/pg@7.14.4' },
            { input: './model.ts.ejs', output: `@/src/models/${name.snakeCase}.ts` },
            { input: './model.test.ts.ejs', output: `@/src/models/${name.snakeCase}.test.ts` },
        ],
        data () {
            return {
                ...args,
                tableName: `model_${args.name.snakeCase}`,
            }
        }
    };
};
