
exports.getConfig = function getConfig (args, cwd, utils) {
    const name = args.name;
    const filePath = ('@/src/component/' + name.snakeCase).replace(/[\/]+/, '/');
    return {
        entities: [
            { input: './component.vue.ejs', output: `${filePath}.vue` },
            { input: './component.less.ejs', output: `${filePath}.less` },
            { input: './component.test.ts.ejs', output: `${filePath}.test.ts` },
            utils.addScaffoldRecipieStep(args, 'component'),
            utils.gitCommitCmd(args, 'add new component'),
        ],
    };
};
