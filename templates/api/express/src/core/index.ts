import path from 'path';
import glob from 'glob';
import clc from 'cli-color';
import express, { Request, Response, Express } from 'express';
import { buildApiPath } from './helpers';

export interface StartOptions {
  silent?: boolean;
}

export const PORT = process.env.PORT || 8080;
const endpointsDir = path.resolve(__dirname, '..', 'endpoints');

async function hanldeAllFilesInEndpointsDir (app: Express, options: StartOptions) {
  return new Promise((resolve) => {
    glob('./**/*.@(ts|js)', { 
      cwd: endpointsDir,
      nodir: true,
      ignore: './**/*.test.@(ts|js)',
      strict: true,
    }, function (error, files) {
      if (error) throw error;
  
      for (let i = 0; i < files.length; i++) {
        const fullFilename = files[i];
        const [error, method, apiPath] = buildApiPath(fullFilename, endpointsDir);
        if (error) {
          if (!options.silent) console.warn(clc.yellow(error));
          continue;
        }
        const { handler } = require(path.resolve(endpointsDir, fullFilename));
        if (!options.silent) console.log(clc.blackBright(`Найден эндпоинт ${method.toUpperCase()} ${apiPath}`));
        app[method](apiPath, handler);
      }
      resolve();
    });
  });
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
