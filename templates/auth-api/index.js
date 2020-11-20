
exports.getConfig = function getConfig (args, cwd, utils) {
    return {
        entities: [
            { input: './midleware', output: `@/src/midlewares/auth` },
            { input: './endpoints', output: `@/src/endpoints/auth` },
            { input: './tests', output: `@/src/tests/auth` },
            {
                scaffold: 'crud',
                args: {
                    datasource: 'default',
                    prefix: 'auth',
                    name: 'user',
                    fields: [
                        { name: 'name', type: 'varchar(100) not null' },
                        { name: 'email', type: 'varchar(100) not null' },
                        { name: 'role', type: 'varchar(20)' },
                        { name: 'passhash', type: 'varchar(128) not null' },
                        { name: 'salt', type: 'varchar(32) not null' },
                        // { name: 'description', type: 'text not null' },
                        // { name: 'count', type: 'integer' },
                        // { name: 'updated_at', type: 'date' },
                        // { name: 'updated_at', type: 'timestamp DEFAULT current_timestamp' },
                        { name: 'created_at', type: 'timestamp DEFAULT current_timestamp' },
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
                        { name: 'user_id', type: 'int' },
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
