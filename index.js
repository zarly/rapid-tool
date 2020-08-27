const path = require('path');
const scaffold = require('easy-scaffold');

async function runAction ({ action, params, cwd }) {
    return await scaffold(path.resolve(__dirname, 'templates', action), params, cwd);
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
