import { TokenBody } from "./interfaces";
import { jwt_secret } from './environment_variables';
import jwt from 'jsonwebtoken';


export const signToken = (payload: TokenBody, expiresIn?: number): string => {
    const token = expiresIn
        ? jwt.sign(payload, jwt_secret!, { expiresIn })
        : jwt.sign(payload, jwt_secret!);
    return token;
};

export const isTokenValid = (token: string): boolean => {
    try {
        return jwt.verify(token, jwt_secret!) ? true : false;
    } catch (e) {
        return false;
    }
};

export const decodePayload = (token: string): TokenBody => {
    return <TokenBody>jwt.decode(token);
};

export const getTokenPayload = (jsonToken: string): TokenBody => {
    return <TokenBody>jwt.verify(jsonToken, jwt_secret!);
};