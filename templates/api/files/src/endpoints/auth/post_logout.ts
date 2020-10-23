import { Request, Response } from 'express';
import { logout } from '../../core/auth';

export function handler (req: Request, res: Response) {
    res.send({succes: true});
}

export const middlewares = [...logout()];
