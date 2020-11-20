import { Request, Response } from 'express';
import { allowForRoles } from '../../midlewares/auth';

export async function handler (req: Request, res: Response) {
    const user = (req as any).user;
    if (user) {
        res.send(user);
    } else {
        res.status(401).send({ error: 'Usere was not found' });
    }
}

export const middlewares = [...allowForRoles(['any'])];
