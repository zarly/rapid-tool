import { Request, Response } from 'express';
import cookieParser from 'cookie-parser';

export async function init () {

}

export function login () {
    return [
        cookieParser(),
        function (req: Request, res: Response, next: (...args: any[]) => void) {
            if (req.body.role) {
                res.cookie('role', req.body.role, { maxAge: 900000, httpOnly: true });
                next();
            } else {
                res.sendStatus(400);
            }
        }
    ];
}

export function logout () {
    return [
        cookieParser(),
        function (req: Request, res: Response, next: (...args: any[]) => void) {
            res.cookie('role', null, { maxAge: 0, httpOnly: true });
            next();
        }
    ];
}

export function allowForRoles (roles: string[]) {
    return [
        cookieParser(),
        function (req: Request, res: Response, next: (...args: any[]) => void) {
            if (!req.cookies.role) {
                res.sendStatus(401);
            } else if (roles.indexOf(req.cookies.role) !== -1) {
                next();
            } else {
                res.sendStatus(403);
            }
        }
    ];
}
