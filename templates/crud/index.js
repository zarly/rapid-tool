
exports.getConfig = function getConfig (args) {
    const { name } = args;
    return {
        entities: [
            { cmd: 'npm install --save pg@8.3.3' },
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
