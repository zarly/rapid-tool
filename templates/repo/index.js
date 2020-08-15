
exports.getConfig = function getConfig (args) {
    const { name } = args;
    return {
        entities: [
            { input: './package.json.ejs', output: `@/${name}/package.json` },
            { input: './.gitignore', output: `@/${name}/.gitignore` },
            { input: './.editorconfig.ejs', output: `@/${name}/.editorconfig` },
            { cmd: `git init && git add . && git commit -m init` },
        ],
    };
};
