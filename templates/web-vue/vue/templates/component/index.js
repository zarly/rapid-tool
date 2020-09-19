
exports.getConfig = function getConfig (args) {
    const name = args.name;
    const filePath = ('@/src/component/' + name.snakeCase).replace(/[\/]+/, '/');
    return {
        entities: [
            { input: './component.vue.ejs', output: `${filePath}.vue` },
            { input: './component.test.ts.ejs', output: `${filePath}.test.ts` },
            { cmd: `git add . && git commit -m "add new component"` },
        ],
    };
};
