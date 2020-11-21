import { Request, Response } from 'express';
import { provideUser, generatePassHashPassword, generatePassHashAndSalt } from '../../midlewares/auth';
import { user as userModel } from '../../models/user';

export async function handler (req: Request, res: Response) {
    const userId: number = (req as any).userId;
    const user = (req as any).user;
    if (user.passhash !== generatePassHashPassword(req.body.oldPassword, user.salt)) {
        return res.status(403).send({
            success: false,
            error: 'Old password is not correct',
        });
    }

    const { passhash, salt } = generatePassHashAndSalt(req.body.newPassword);

    const response = await userModel.updateFields(userId, [
        ['passhash', passhash],
        ['salt', salt],
    ]);

    res.send({
        success: response.rowCount === 1,
    });
}

export const middlewares = [...provideUser()];
