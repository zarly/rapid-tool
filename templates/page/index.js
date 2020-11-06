
exports.getConfig = function getConfig (args, cwd, utils) {
    const name = args.name;
    args.namespace = args.namespace || '';
    const filePath = (`@/src/pages/${args.namespace.snakeCase}/${name.snakeCase}`).replace(/[\/]+/, '/');
    return {
        entities: [
            { input: './page.vue.ejs', output: `${filePath}/${name.snakeCase}.vue` },
            { input: './page.less.ejs', output: `${filePath}/${name.snakeCase}.less` },
            { input: './page.spec.js.ejs', output: `${filePath}/${name.snakeCase}.spec.js` },
            utils.addScaffoldRecipieStep(args, 'page'),
            utils.gitCommitCmd(args, 'add new page'),
        ],
    };
};
