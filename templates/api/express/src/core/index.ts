import path from 'path';
import clc from 'cli-color';
import express, { Express } from 'express';
import { dispatcher } from './dispatcher';
import { buildApiPath } from './helpers';

export interface StartOptions {
  silent?: boolean;
}

export const PORT = process.env.PORT || 8080;
const endpointsDir = path.resolve(__dirname, '..', 'endpoints');

async function hanldeAllFilesInEndpointsDir (app: Express, options: StartOptions) {
  const files = await dispatcher(endpointsDir);
  for (let i = 0; i < files.length; i++) {
    const fullFilename = files[i];
    const [error, method, apiPath] = buildApiPath(fullFilename, endpointsDir);
    if (error) {
      if (!options.silent) console.warn(clc.yellow(error));
    } else if ('string' === typeof method && 'string' === typeof apiPath) {
      const { handler } = require(path.resolve(endpointsDir, fullFilename));
      if (!options.silent) console.log(clc.blackBright(`Найден эндпоинт ${method.toUpperCase()} ${apiPath}`));
      app[method](apiPath, handler);
    } else {
      throw new Error('Unexpected api path result');
    }
  }
}

export function start (options: StartOptions = {}) {
  return new Promise(async function(resolve) {
    const app = express();

    await hanldeAllFilesInEndpointsDir(app, options);

    const server = app.listen(PORT, () => {
      if (!options.silent) console.log(`Server is running at http://localhost:${PORT}`);
      resolve(server);
    });
  });
}
