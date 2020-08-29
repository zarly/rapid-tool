import path from 'path';

export type HttpMethods = 'get' | 'post' | 'patch' | 'delete';

const fileSplitter = /^([a-zA-Z]+)_([a-zA-Z-_\.]*)\.(ts|js)$/;

export function buildApiPath (fullFilename: string, endpointsDir: string) {
    const filename = path.basename(fullFilename);
    const match = filename.match(fileSplitter);
    if (!match) {
        return [`Файл ${path.resolve(endpointsDir, fullFilename)} не соответствует конвенции именования эндпоинтов, поэтому не будет обработан диспетчером эндпоинтов`, null, null];
    }
    const method = match[1] as HttpMethods;
    const name = match[2];
    const pathParts = fullFilename.split(path.sep);
    const apiPath = ('/' + pathParts.slice(1, pathParts.length - 1).join('/') + (name ? `/${name}` : ''))
      .replace(/\/\//, '/').replace(/\/_/, '/:').replace(/:_/, '_');
    return [null, method, apiPath];
}
