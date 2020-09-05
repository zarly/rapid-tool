
exports.getConfig = function getConfig (args) {
    args.datasource = args.datasource || 'default';
    args.fields = args.fields || [];
    const { name } = args;

    const fieldsCreateList = args.fields.map(it => `${it.name} ${it.type}`).join(',\n\t\t\t\t');
    const fieldsNameList = args.fields.map(it => it.name).join();
    const fieldsArgsList = args.fields.map((it, n) => `$${n + 1}`).join();
    const fieldsUpdateList = args.fields.map((it, n) => `${it.name} = $${n + 2}`).join(', ');
    const fieldsRecordArr = args.fields.map(it => `record['${it.name}']`).join(', ');

    return {
        entities: [
            { input: './api/get_.ts.ejs', output: `@/src/endpoints/${name.snakeCase}/get_.ts` },
            { input: './api/get__id.ts.ejs', output: `@/src/endpoints/${name.snakeCase}/get__id.ts` },
            { input: './api/post_.ts.ejs', output: `@/src/endpoints/${name.snakeCase}/post_.ts` },
            { input: './api/patch__id.ts.ejs', output: `@/src/endpoints/${name.snakeCase}/patch__id.ts` },
            { input: './api/delete__id.ts.ejs', output: `@/src/endpoints/${name.snakeCase}/delete__id.ts` },
            
            { input: './postgres-model.ts.ejs', output: `@/src/models/${name.snakeCase}.ts` },
            { input: './postgres-model.test.ts.ejs', output: `@/src/models/${name.snakeCase}.test.ts` },

            { cmd: `git add . && git commit -m "add new crud"` },
        ],
        data () {
            return {
                ...args,
                srcRoot: `../..`,
                tableName: `model_${args.name.snakeCase}`,
                fieldsCreateList,
                fieldsNameList,
                fieldsArgsList,
                fieldsUpdateList,
                fieldsRecordArr,
            }
        }
    };
};
