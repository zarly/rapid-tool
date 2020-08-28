
import path from 'path';
import glob from 'glob';
import clc from 'cli-color';
import express, { Request, Response, Express } from 'express';

export type Handler = (req: Request, res: Response) => void;

export type SupportedMethods = 'get' | 'post' | 'patch' | 'delete';

export type Endpoint = {
    method: 'get' | 'post',
    path: string,
    handler: Handler,
};

export interface StartOptions {
  silent?: boolean;
}

export const PORT = process.env.PORT || 8080;
const fileSplitter = /^([a-zA-Z]+)_([a-zA-Z-_\.]*)\.ts$/;
const endpointsDir = path.resolve(__dirname, '..', 'endpoints');

function hanldeAllFilesInEndpointsDir (app: Express, options: StartOptions) {
  glob('./**/*.ts', { 
    cwd: endpointsDir,
    nodir: true,
    ignore: './**/*.test.ts',
    strict: true,
  }, function (error, files) {
    if (error) throw error;

    for (let i = 0; i < files.length; i++) {
      const fullFilename = files[i];
      const filename = path.basename(fullFilename);
      const match = filename.match(fileSplitter);
      if (!match) {
        if (!options.silent) console.warn(clc.yellow(`Файл ${path.resolve(endpointsDir, fullFilename)} не соответствует конвенции именования эндпоинтов, поэтому не будет обработан диспетчером эндпоинтов`));
        continue;
      }
      const method = match[1] as SupportedMethods;
      const name = match[2];
      const pathParts = fullFilename.split(path.sep);
      const apiPath = ('/' + pathParts.slice(1, pathParts.length - 1).join('/') + (name ? `/${name}` : ''))
        .replace(/\/\//, '/').replace(/\/_/, '/:').replace(/:_/, '_');
      const { handler } = require(path.resolve(endpointsDir, fullFilename));
      if (!options.silent) console.log(clc.blackBright(`Найден эндпоинт ${method.toUpperCase()} ${apiPath}`));
      app[method](apiPath, handler);
    }
  });
}

export function start (options: StartOptions = {}) {
    const app = express();
    
    hanldeAllFilesInEndpointsDir(app, options);
    
    const server = app.listen(PORT, () => {
      if (!options.silent) console.log(`Server is running at http://localhost:${PORT}`);
    });

    return server;
}
