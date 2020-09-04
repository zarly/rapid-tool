
exports.getConfig = function getConfig (args) {
    args.datasource = args.datasource || 'default';
    args.type = args.type || 'postgres';
    const { name, type } = args;
    
    if (type === 'postgres') {
        return {
            entities: [
                { cmd: 'npm i --save pg@8.3.3 && npm i -D @types/pg@7.14.4' },
                { input: './postgres.ts.ejs', output: `@/src/datasources/${name.snakeCase}.ts` },
            ],
        };
    } else if (type === 'memory') {
        return {
            entities: [
                { input: './postgres.ts.ejs', output: `@/src/datasources/${name.snakeCase}.ts` },
            ],
        };
    } else {
        throw new Error('Unexpected type:', type);
    }
};