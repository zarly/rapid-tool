import crypto from 'crypto';
import { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import { user } from '../../models/user';
import { session } from '../../models/session';

export async function init () {
}

export type PassHashAndSaltResult = {
    salt: string;
    passhash: string;
};

export function generatePassHashAndSalt (password: string): PassHashAndSaltResult {
    const salt = crypto.randomBytes(16).toString('hex'); 
    const passhash = generatePassHashPassword(password, salt);
    return { salt, passhash };
}

export function generatePassHashPassword (password: string, salt: string): string {
    return crypto.pbkdf2Sync(password, salt, 5, 64, `sha512`).toString(`hex`);
}

export function generateSessionId (): string {
    return crypto.randomBytes(16).toString('hex');
}

export function auth () {
    return [
        cookieParser(),
        // function (req: Request, res: Response, next: (...args: any[]) => void) {
        //     res.cookie('role', req.body.role, { maxAge: 900000, httpOnly: true });
        //     next();
        // },
    ];
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
            res.cookie('session', '', { expires: new Date(0), httpOnly: true });
            next();
        }
    ];
}

function userIdMiddleware () {
    return async function (req: Request, res: Response, next: (...args: any[]) => void) {
        const sessionId = req.cookies.session;
        if (!sessionId) {
            return res.sendStatus(401);
        }
        
        const sessionRecs = await session.searchByOneField('session', sessionId);
        if (!sessionRecs || !sessionRecs[0] || !sessionRecs[0].id) {
            return res.sendStatus(401);
        }
        const userId = sessionRecs[0].id;
        (req as any).userId = userId;
        next();
    }
}

function userMiddleware () {
    return async function (req: Request, res: Response, next: (...args: any[]) => void) {
        const userId: number = (req as any).userId;
        
        const userRec = await user.get(userId);
        if (!userRec) {
            return res.sendStatus(401);
        }
        (req as any).user = userRec;
        next();
    };
}

function checkRolesMiddleware (roles: string[]) {
    return async function (req: Request, res: Response, next: (...args: any[]) => void) {
        const userRec = (req as any).user;
        if (roles[0] === 'any' || roles.indexOf(userRec.role) !== -1) {
            next();
        } else {
            res.sendStatus(403);
        }
    };
}

export function provideUserId () {
    return [
        cookieParser(),
        userIdMiddleware(),
    ];
}

export function provideUser () {
    return [
        cookieParser(),
        userIdMiddleware(),
        userMiddleware(),
    ];
}

export function allowForRoles (roles: string[]) {
    return [
        cookieParser(),
        userIdMiddleware(),
        userMiddleware(),
        checkRolesMiddleware(roles),
    ];
}
