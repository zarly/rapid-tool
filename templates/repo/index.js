
exports.getConfig = function getConfig (args) {
    return {
        entities: [
            { input: './package.json.ejs', output: '@/package.json' },
            { input: './.gitignore.ejs', output: '@/.gitignore' },
        ],
        data () {
            return args;
        },
    };
};
