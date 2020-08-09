import { Request, Response } from 'express';
import { isTokenValid, decodePayload, signToken } from '../jwt';
import { getRefreshTokenOptions } from '../helpers';
import { getToken } from '../services/spotify.service';
import { Token } from '../interfaces';

export const verifyUserRoute = (req: Request, res: Response) => {
    const { token } = req.query;
    isTokenValid(`${token}`) ? res.json({ ...req.query }) : refreshToken(res, `${token}`);
  };

  const refreshToken = (res: Response, tokenString: string) => {
    const { refresh } = decodePayload(tokenString)!;
    getRefreshToken(res, refresh);
  };

  const getRefreshToken = (res: Response, refresh: string) => {
    const options = getRefreshTokenOptions(refresh);
    getToken(options).then((response: Token) => {
      const { access_token, expires_in } = response;
      const token = signToken({ token: access_token, refresh }, expires_in);
      res.json({ token });
    });
  };