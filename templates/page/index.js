
exports.getConfig = function getConfig (args) {
    const name = args.name;
    args.namespace = args.namespace || '';
    const filePath = (`@/src/pages/${args.namespace.snakeCase}/${name.snakeCase}`).replace(/[\/]+/, '/');
    return {
        entities: [
            { input: './page.vue.ejs', output: `${filePath}/${name.snakeCase}.vue` },
            { input: './page.spec.js.ejs', output: `${filePath}/${name.snakeCase}.spec.js` },
            { cmd: `git add . && git commit -m "add new page"` },
        ],
    };
};
