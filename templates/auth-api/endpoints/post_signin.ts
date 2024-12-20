import { Request, Response } from 'express';
import { auth, generatePassHashPassword, generateSessionId } from '../../midlewares/auth';
import { user } from '../../models/user';
import { session } from '../../models/session';

function sendAuthError (res: Response) {
    res.status(401).send({
        error: 'Login or password is not correct',
    });
}

export async function handler (req: Request, res: Response) {
    const records = await user.searchByOneField('email', req.body.email);
    const rec = records && records[0];
    if (!rec) {
        sendAuthError(res);
        return;
    }

    const passhash = generatePassHashPassword(req.body.password, rec.salt);
    if (passhash === rec.passhash) {
        const sessionId = generateSessionId();
        const sessionRes = await session.add({
            user_id: rec.id,
            session: sessionId,
        });
        res.cookie('session', sessionId, {
            expires: new Date(Date.now() + 24 * 3600 * 1000),
            httpOnly: true,
        });

        res.send({
            succes: true,
            name: rec.name,
            email: rec.email,
            role: rec.role,
            sessionRes,
        });
    } else {
        sendAuthError(res);
    }
}

export const middlewares = [...auth()];
