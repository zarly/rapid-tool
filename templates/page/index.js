
function buildPagePath(namespace, name) {
    return `pages/${namespace.snakeCase}/${name.snakeCase}/${name.snakeCase}_page`.replace(/[\/]+/, '/');
}

function buildImportString(namespace, name) {
    return `import Page${name.classCase} from '@/${buildPagePath(namespace, name)}';`;
}

function buildPathRoute(name, path) {
    return `  {
    path: '${path}',
    name: '${name.classCase}Page',
    component: Page${name.classCase},
  },\n`;
}

const importRegExp = /^import /;
function addRoute (namespace, name, path) {
    return function addRouteIn (code) {
        let lines = code.split('\n');
        const lastImportLine = lines.reduce((a, line, n) => Math.max(a, importRegExp.test(line) ? n : 0), 0);
        lines.splice(lastImportLine + 1, 0, buildImportString(namespace, name));
        code = lines.join('\n');

        if (path) {
            code = code.replace(/^const routes = \[[^\]]*?\n\];/m, function (foundText) {
                return foundText.replace(/];/, `${buildPathRoute(name, path)}];`);
            });
        }
        
        return code;
    };
}

function deleteRoute (namespace, name, path) {
    return function deleteRouteIn (code) {
        code = code.replace(`${buildImportString(namespace, name)}\n`, '');

        if (path) {
            code = code.replace(`${buildPathRoute(name, path)}`, '');
        }

        return code;
    };
}

exports.getConfig = function getConfig (args, cwd, utils) {
    const name = args.name;
    const path = args.path;
    const namespace = args.namespace = args.namespace || '';
    const filePath = `@/src/${buildPagePath(namespace, name)}`;
    return {
        entities: [
            { input: './page.vue.ejs', output: `${filePath}.vue` },
            { input: './page.less.ejs', output: `${filePath}.less` },
            { input: './page.spec.js.ejs', output: `${filePath}.spec.js` },
            {
                file: '@/src/router/index.js',
                modify: addRoute(namespace, name, path),
                revert: deleteRoute(namespace, name, path),
            },
            utils.addScaffoldRecipieStep(args, 'page'),
            utils.gitCommitCmd(args, 'add new page'),
        ],
    };
};
