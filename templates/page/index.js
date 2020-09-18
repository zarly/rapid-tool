
exports.getConfig = function getConfig (args) {
    const name = args.name;
    const filePath = ('@/src/pages/' + name.snakeCase).replace(/[\/]+/, '/');
    return {
        entities: [
            { input: './page.ts.ejs', output: `${filePath}.ts` },
            { input: './page.test.ts.ejs', output: `${filePath}.test.ts` },
            { cmd: `git add . && git commit -m "add new page"` },
        ],
    };
};
