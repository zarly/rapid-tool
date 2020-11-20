import { Request, Response } from 'express';
import { login } from '../../midlewares/auth';

export async function handler (req: Request, res: Response) {
    res.send({succes: true});
}

export const middlewares = [...login()];
