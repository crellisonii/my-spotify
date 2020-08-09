import { authorizeUrl } from "../constants";
import { Response } from "express";
import qs from 'querystringify';
import request from 'request-promise';
import { AuthorizationOptions, AuthorizeParams, Token } from "../interfaces";
import { RequestPromise } from "request-promise";


export const login = (res: Response, params: AuthorizeParams): void => {
    const url = authorizeUrl;
    const queryParams = qs.stringify(params);
    res.redirect(`${url}?${queryParams}`);
  };
  
  export const getToken = (params: AuthorizationOptions): RequestPromise<Token> => {
    return request(params);
  };