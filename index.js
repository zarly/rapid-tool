const path = require('path');
const scaffold = require('easy-scaffold');
const utils = require('./utils');

const MODES = {
    NORMAL: 1,
    UPDATE: 2,
    REVERT: 3,
};

const templatePaths = [__dirname];

async function runScaffold ({ action, params, cwd }) {
    return await scaffold(action, params, { cwd, utils, templatePaths });
}

async function runRevert ({ action, params, cwd }) {
    return await scaffold.revert(action, params, { cwd, utils, templatePaths });
}

async function runUpdate ({ action, params, cwd }) {
    await scaffold.revert(action, params, { cwd, utils, templatePaths });
    return await scaffold(action, params, { cwd, utils, templatePaths });
}

async function runAction ({ mode = MODES.NORMAL, ...params }) {
    switch (mode) {
        case MODES.NORMAL:
            return await runScaffold(params);
        case MODES.UPDATE:
            return await runUpdate(params);
        case MODES.REVERT:
            return await runRevert(params);
        default:
            throw new Error(`Unexpected mode: ${mode}`);
    }
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
    MODES,
    runAction,
    runActions,
    rapidTool,
};
