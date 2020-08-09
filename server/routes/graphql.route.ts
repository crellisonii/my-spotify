import { NextFunction, Request, Response } from "express";
import { getTokenPayload } from "../jwt";


export const graphqlRoute = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers["authorization"];
    if (authHeader) {
        const { token } = getTokenPayload(authHeader);
        req.headers["authorization"] = `Bearer ${token}`;
    }
    next();
};

export const playgroundRoute = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log(process.env.ENABLE_PLAYGROUND);
    if (process.env.ENABLE_PLAYGROUND && req.path === "/playground") {
        next();
    } else {
        res.status(403).end();
    }
};