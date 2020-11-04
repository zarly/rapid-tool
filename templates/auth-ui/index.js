const importRegExp = /^import /;

function addAuthRoute (code) {
    let lines = code.split('\n');
    const lastImportLine = lines.reduce((a, line, n) => Math.max(a, importRegExp.test(line) ? n : 0), 0);
    lines.splice(lastImportLine + 1, 0, `import Auth from '@/pages/auth';`);
    code = lines.join('\n');

    code = code.replace(/^const routes = \[[^\]]*?\n\];/m, function (foundText) {
      return foundText.replace(/];/, `  Auth('/auth'),\n];`);
    });
    return code;
}

function deleteAuthRoute (code) {
    code = code.replace(`import Auth from '@/pages/auth';\n`, '');
    code = code.replace(`  Auth('/auth'),\n`, '');
    return code;
}

exports.getConfig = function getConfig (args) {
    return {
        entities: [
            { input: './pages', output: '@/src/pages/auth' },
            { file: '@/src/router/index.js', modify: addAuthRoute, revert: deleteAuthRoute },
            {
                json: `@/.scaffold/recipe.json`,
                modify (json) {
                    json.updates.push({
                        command: 'auth-ui',
                        args: args,
                    });
                },
                revert (json) {
                    json.updates.push({
                        command: 'auth-ui',
                        args: args,
                        revert: true,
                    });
                },
            },
            {
                cmd: `git add . && git commit -m "add auth ui" || echo "git error"`,
                revert: `git add . && git commit -m "revert add auth ui" || echo "git error"`,
            },
        ],
    };
};
