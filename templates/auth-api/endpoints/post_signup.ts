import { Request, Response } from 'express';
import { auth, generatePassHashAndSalt } from '../../midlewares/auth';
import { user } from '../../models/user';

export async function handler (req: Request, res: Response) {
    const { passhash, salt } = generatePassHashAndSalt(req.body.password);

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
