import crypto from 'crypto';
import { Request, Response } from 'express';
import { auth } from '../../midlewares/auth';
import { user } from '../../models/user';

export async function handler (req: Request, res: Response) {
    const salt = crypto.randomBytes(16).toString('hex'); 
    const passhash = crypto.pbkdf2Sync(req.body.password, salt, 5, 64, `sha512`).toString(`hex`);

    const response = await user.add({
        name: req.body.name,
        email: req.body.email,
        passhash,
        salt,
    });

    res.send({
        succes: response.rowCount === 1,
    });
}

export const middlewares = [...auth()];
