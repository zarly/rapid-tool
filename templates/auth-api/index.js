
exports.getConfig = function getConfig (args, cwd, utils) {
    return {
        entities: [
            { input: './midleware', output: `@/src/midlewares/auth` },
            { input: './endpoints', output: `@/src/endpoints/auth` },
            {
                scaffold: 'crud',
                args: {
                    datasource: 'default',
                    prefix: 'auth',
                    name: 'user',
                    fields: [
                        { name: 'username', type: 'varchar(40)' },
                        { name: 'passhash', type: 'varchar(40)' },
                        { name: 'description', type: 'text not null' },
                        { name: 'count', type: 'integer' },
                        { name: 'created_at', type: 'date' },
                        { name: 'updated_at', type: 'timestamp DEFAULT current_timestamp' },
                    ],
                    inherited: true,
                },
            },
            {
                scaffold: 'crud',
                args: {
                    datasource: 'default',
                    prefix: 'auth',
                    name: 'session',
                    fields: [
                        { name: 'username', type: 'varchar(40)' },
                        { name: 'session', type: 'varchar(40)' },
                        { name: 'created_at', type: 'date' },
                    ],
                    inherited: true,
                },
            },
            utils.addScaffoldRecipieStep(args, 'auth-api'),
            utils.gitCommitCmd(args, 'add auth api'),
        ],
    };
};
