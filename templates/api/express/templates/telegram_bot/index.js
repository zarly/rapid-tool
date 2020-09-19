
const path = require('path');

exports.getConfig = function getConfig (args) {
    return {
        entities: [
            { cmd: `npm install --save axios` },
            { cmd: `cp -R ${path.resolve(__dirname, 'files')}/. ./scripts/telegram` },
        ],
    };
};
