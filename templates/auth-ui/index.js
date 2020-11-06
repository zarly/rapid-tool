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

exports.getConfig = function getConfig (args, cwd, utils) {
    return {
        entities: [
            { input: './pages', output: '@/src/pages/auth' },
            { file: '@/src/router/index.js', modify: addAuthRoute, revert: deleteAuthRoute },
            utils.addScaffoldRecipieStep(args, 'auth-ui'),
            utils.gitCommitCmd(args, 'add auth ui'),
        ],
    };
};
