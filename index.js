const path = require('path');
const scaffold = require('easy-scaffold');

async function runAction ({ action, params, cwd }) {
    const configFilePath = await scaffold.resolveConfigFile(action, cwd) || path.resolve(__dirname, 'templates', action);
    return await scaffold(configFilePath, params, cwd);
}

async function runActions (actions) {
    for (let i = 0; i < actions.length; i++) {
        await runAction(actions[i]);
    }
}

async function rapidTool (actions) {
    if (actions instanceof Array) {
        await runActions(actions);
    } else {
        await runAction(actions);
    }
}

module.exports = {
    runAction,
    runActions,
    rapidTool,
};
