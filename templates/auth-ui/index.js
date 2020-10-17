
exports.getConfig = function getConfig (args) {
    return {
        entities: [
            { input: './pages', output: '@/src/pages/auth' },
            { cmd: `git add . && git commit -m "add new page"` },
        ],
    };
};
