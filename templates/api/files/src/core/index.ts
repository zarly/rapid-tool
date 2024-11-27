import path from 'path';
import clc from 'chalk';
import express, { Express } from 'express';
import bodyParser from 'body-parser';
import { deepDispatcher, flatDispatcher } from './dispatcher';
import { buildApiPath } from './helpers';

export interface StartOptions {
  silent?: boolean;
  fullDbReset?: boolean;
  noDbInit?: boolean;
}

export const PORT = process.env.PORT || 8000;
const jsonBodyParser = bodyParser.json();

const modelsDir = path.resolve(__dirname, '..', 'models');
async function handleAllModels (options: StartOptions) {
  const files = await flatDispatcher(modelsDir);
  for (let i = 0; i < files.length; i++) {
    const name = files[i];
    const module = require(path.resolve(modelsDir, name));
    if (!options.silent) console.log(clc.blackBright(`Инициализация модели ${name}`));

    if (options.fullDbReset) {
      await module[name].deInit();
    }
    if (!options.noDbInit) {
      await module[name].init();
    }
  }
};

const midlewaresDir = path.resolve(__dirname, '..', 'midlewares');
async function handleAllFilesInMidlewaressDir (app: Express, options: StartOptions) {
  const files = await flatDispatcher(midlewaresDir);
  for (let i = 0; i < files.length; i++) {
    const fullFilename = files[i];
    const { init } = require(path.resolve(midlewaresDir, fullFilename));
    if (!options.silent) console.log(clc.blackBright(`Инициализация midleware ${fullFilename}`));
    await init(app, options);
  }
};

const endpointsDir = path.resolve(__dirname, '..', 'endpoints');
async function handleAllFilesInEndpointsDir (app: Express, options: StartOptions) {
  const files = await deepDispatcher(endpointsDir);
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

    await handleAllModels(options);
    await handleAllFilesInMidlewaressDir(app, options);
    await handleAllFilesInEndpointsDir(app, options);

    const server = app.listen(PORT, () => {
      if (!options.silent) console.log(`Server is running at http://localhost:${PORT}`);
      resolve(server);
    });
  });
}
