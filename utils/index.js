
exports.gitCommitCmd = function gitCommitCmd (args, message) {
    if (args.inherited || args.skipGit) return null;
    if (/[^а-яА-Я\w- _,\.]/.test(message)) throw new Error('В сообщении разрешены только буквы и цифры');
    return {
        cmd: `git add . && git commit -m "${message}" || echo "git error" 1>&2`,
        revert: `git add . && git commit -m "revert ${message}" || echo "git error" 1>&2`,
    };
};

exports.initCommitCmd = function initCommitCmd (args, dir, message = 'init') {
    if (args.inherited || args.skipGit) return null;
    if (/[^а-яА-Я\w- _,\.]/.test(message)) throw new Error('В сообщении разрешены только буквы и цифры');
    return {
        cmd: `cd ${dir} && git init && git add . && git commit -m init || echo "git error" 1>&2`,
        revert: `git add . && git commit -m "revert ${message}" || echo "git error" 1>&2`,
    };
};

exports.initDependencies = function initDependencies (args, dir, tarFilePath) {
    if (args.skipDependencies) return null;
    return {
        cmd: `tar -xvf ${tarFilePath} -C ./${dir}`,
        revert: `rm -Rf ./${dir}/node_modules`,
    };
};   

exports.installPackages = function installPackages (args, packages) {
    if (args.skipDependencies) return null;
    return {
        cmd: `npm install --save ${packages}`,
        revert: `npm uninstall --save ${packages}`,
    };
};

exports.addScaffoldRecipieStep = function addScaffoldRecipieStep (args, command) {
    if (args.inherited || args.skipRecipe) return null;
    return {
        json: `@/.scaffold/recipe.json`,
        modify (json) {
            json.updates.push({
                command,
                args,
            });
        },
        revert (json) {
            json.updates.push({
                command,
                args,
                revert: true,
            });
        },
    };
};   

exports.initScaffoldRecipie = function initScaffoldRecipie (args, dir, command) {
    if (args.skipRecipe) return null;
    return {
        json: `@/${dir}/.scaffold/recipe.json`, 
        modify () {
            return {
                init: {
                    command,
                    args: args,
                },
                updates: [],
            };
        },
        revert () {
            return {};
        },
    };
};

