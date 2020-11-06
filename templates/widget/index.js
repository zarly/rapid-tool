
exports.getConfig = function getConfig (args, cwd, utils) {
    const name = args.name;
    args.namespace = args.namespace || '';
    const filePath = (`@/src/widgets/${args.namespace.snakeCase}/${name.snakeCase}`).replace(/[\/]+/, '/');
    return {
        entities: [
            { input: './widget.vue.ejs', output: `${filePath}/${name.snakeCase}.vue` },
            { input: './widget.less.ejs', output: `${filePath}/${name.snakeCase}.less` },
            { input: './widget.spec.js.ejs', output: `${filePath}/${name.snakeCase}.spec.js` },
            utils.addScaffoldRecipieStep(args, 'widget'),
            utils.gitCommitCmd(args, 'add new widget'),
        ],
    };
};
