import { Request, Response } from 'express';
import { allowForRoles } from '../../midlewares/auth';

export async function handler (req: Request, res: Response) {
    const user = (req as any).user;
    if (user) {
        res.send({
            name: user.name,
            email: user.email,
            role: user.role,
            created_at: user.created_at,
        });
    } else {
        res.status(401).send({ error: 'Usere was not found' });
    }
}

export const middlewares = [...allowForRoles(['any'])];
