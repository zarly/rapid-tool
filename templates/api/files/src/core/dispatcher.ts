import fs from 'fs';
import glob from 'glob';

export function deepDispatcher (directory: string): Promise<string[]> {
    return new Promise(function (resolve, reject) {
        glob('./**/*.@(ts|js)', { 
            cwd: directory,
            nodir: true,
            ignore: './**/*.test.@(ts|js)',
            strict: true,
        }, function (error, files) {
            if (error) reject(error);
            else resolve(files);
        });
    });
}

export function flatDispatcher (directory: string): Promise<string[]> {
    return fs.promises.readdir(directory);
}
