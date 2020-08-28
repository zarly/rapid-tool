
exports.getConfig = function getConfig (args) {
    const { name } = args;
    return {
        entities: [
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
