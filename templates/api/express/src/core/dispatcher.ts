import glob from 'glob';

export function dispatcher (directory: string): Promise<string[]> {
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
