import path from 'path';
import clc from 'cli-color';
import express, { Express } from 'express';
import bodyParser from 'body-parser';
import { dispatcher } from './dispatcher';
import { buildApiPath } from './helpers';
import { init as initAuth } from './auth';

export interface StartOptions {
  silent?: boolean;
}

export const PORT = process.env.PORT || 8000;
const endpointsDir = path.resolve(__dirname, '..', 'endpoints');
const jsonBodyParser = bodyParser.json();

async function hanldeAllFilesInEndpointsDir (app: Express, options: StartOptions) {
  const files = await dispatcher(endpointsDir);
  for (let i = 0; i < files.length; i++) {
    const fullFilename = files[i];
    const [error, method, apiPath] = buildApiPath(fullFilename, endpointsDir);
    if (error) {
      if (!options.silent) console.warn(clc.yellow(error));
    } else if ('string' === typeof method && 'string' === typeof apiPath) {
      const { handler, middlewares = [] } = require(path.resolve(endpointsDir, fullFilename));
      if (!options.silent) console.log(clc.blackBright(`Найден эндпоинт ${method.toUpperCase()} ${apiPath}`));
      if (method === 'get' || method === 'delete') {
        app[method](apiPath, ...middlewares, handler);
      } else {
        app[method](apiPath, jsonBodyParser, ...middlewares, handler);
      }
    } else {
      throw new Error('Unexpected api path result');
    }
  }
}

export function start (options: StartOptions = {}) {
  return new Promise(async function(resolve) {
    const app = express();

    await initAuth();
    await hanldeAllFilesInEndpointsDir(app, options);

    const server = app.listen(PORT, () => {
      if (!options.silent) console.log(`Server is running at http://localhost:${PORT}`);
      resolve(server);
    });
  });
}
