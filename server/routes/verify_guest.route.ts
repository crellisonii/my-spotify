import { Request, Response } from "express";
import { isTokenValid, signToken } from '../jwt';
import { getClientCredentialsOptions } from '../helpers';
import { Token } from '../interfaces';
import { getToken } from '../services';


export const verifyGuestRoute = (req: Request, res: Response) => {
    const { token } = req.query;
    isTokenValid(`${token}`) ? res.json({ token }) : getNewToken(res);
};

const getNewToken = (res: Response) => {
    const options = getClientCredentialsOptions();
    getToken(options).then((response: Token) => {
        const { access_token, expires_in } = response;
        const token = signToken({ token: access_token }, expires_in);
        res.json({ token });
    });
};