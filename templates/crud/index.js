
exports.getConfig = function getConfig (args) {
    args.datasource = args.datasource || 'default';
    args.fields = args.fields || [];
    args.prefix = args.prefix || '';
    const { name, prefix } = args;

    const fieldsCreateList = args.fields.map(it => `${it.name} ${it.type}`).join(',\n\t\t\t\t');
    const fieldsNameList = args.fields.map(it => it.name).join();
    const fieldsNameReadList = ['id'].concat(fieldsNameList).filter(it => it).join();
    const fieldsArgsList = args.fields.map((it, n) => `$${n + 1}`).join();
    const fieldsUpdateList = args.fields.map((it, n) => `${it.name} = $${n + 2}`).join(', ');
    const fieldsRecordArr = args.fields.map(it => `record['${it.name}']`).join(', ');

    const endpointDir = `@/src/endpoints/${prefix}/${name.snakeCase}`.replace(/[\/]+/, '/');
    const modelPath = `@/src/models/${name.snakeCase}`;
    const endpointSrcRoot = endpointDir
        .replace('@/src/', '')
        .split('/')
        .filter(it => it)
        .map(() => '..')
        .join('/');
    return {
        entities: [
            { input: './api/', output: endpointDir },
            { input: './postgres-model/', output: modelPath },
            { 
                json: `@/.scaffold/recipe.json`, 
                modify (json) {
                    json.updates.push({
                        command: 'crud',
                        args: args,
                    });
                } 
            },
            { cmd: `git add . && git commit -m "add new crud"` },
        ],
        data () {
            return {
                ...args,
                srcRoot: endpointSrcRoot,
                tableName: `model_${args.name.snakeCase}`,
                fieldsCreateList,
                fieldsNameReadList,
                fieldsNameList,
                fieldsArgsList,
                fieldsUpdateList,
                fieldsRecordArr,
            }
        }
    };
};
