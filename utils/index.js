
exports.gitCommitCmd = function gitCommitCmd (args, message) {
    if (args.inherited || args.skipGit) return null;
    if (/[^а-яА-Я\w- _,\.]/.test(message)) throw new Error('В сообщении разрешены только буквы и цифры');
    return {
        cmd: `git add . && git commit -m "${message}" || echo "git error" 1>&2`,
        revert: `git add . && git commit -m "revert ${message}" || echo "git error" 1>&2`,
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

