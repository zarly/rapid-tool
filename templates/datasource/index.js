
exports.getConfig = function getConfig (args) {
    args.name = args.name || 'default';
    args.type = args.type || 'postgres';
    const { name, type } = args;

    if (type === 'postgres') {
        return {
            entities: [
                // { cmd: 'npm i --save pg@8.3.3 && npm i -D @types/pg@7.14.4' },
                { input: './postgres.ts.ejs', output: `@/src/datasources/${name.snakeCase}.ts` },
                { 
                    json: `@/.scaffold/recipe.json`, 
                    modify (json) {
                        json.updates.push({
                            command: 'datasource',
                            args: args,
                        });
                    } 
                },
                { cmd: `git add . && git commit -m "add new datasource"` },
            ],
        };
    } else if (type === 'memory') {
        return {
            entities: [
                { input: './memory.ts.ejs', output: `@/src/datasources/${name.snakeCase}.ts` },
                { 
                    json: `@/.scaffold/recipe.json`, 
                    modify (json) {
                        json.updates.push({
                            command: 'datasource',
                            args: args,
                        });
                    } 
                },
                { cmd: `git add . && git commit -m "add new datasource"` },
            ],
        };
    } else {
        throw new Error('Unexpected type:', type);
    }
};
