import { Request, Response } from 'express';
import { client_id, callback_url } from '../environment_variables';
import { AuthorizeParams, AuthorizationOptions, Token } from '../interfaces';
import { getAuthorizationCodeOptions, getClientCredentialsOptions } from '../helpers';
import { signToken } from '../jwt';
import { login, getToken } from '../services';


const stateKey = "spotify_auth_state";

const generateRandomString = (length: number): string => {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export const loginRoute = (req: Request, res: Response): void => {
  var state = generateRandomString(16);
  res.cookie(stateKey, state);
  var scope = "user-read-private user-read-email";
  const params: AuthorizeParams = {
    response_type: "code",
    client_id: client_id!,
    scope: scope,
    redirect_uri: callback_url!,
    state: state
  };
  login(res, params);
};

export const callbackRoute = (req: Request, res: Response): void => {
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;
  if (state === null || state !== storedState) {
    console.log("wrong state");
  } else {
    res.clearCookie(stateKey);
    const options = getAuthorizationCodeOptions(`${code}`);
    try {
      getAccessToken(res, options);
    } catch (e) {
      console.log("e: ", e);
    }
  }
};

const getAccessToken = (
  res: Response,
  options: AuthorizationOptions
) => {
  getToken(options).then(
    (response: Token) => {
      const { access_token, expires_in, refresh_token } = response;
      const token = refresh_token
        ? signToken({ token: access_token, refresh: refresh_token }, expires_in)
        : signToken({ token: access_token }, expires_in);
      res.json({ token });
    },
    reason => {
      const { name, statusCode } = reason;
      const { error } = reason.error;
      console.log("reject name: ", name);
      console.log("reject statusCode: ", statusCode);
      console.log("reject error: ", error);
    }
  );
};

export const authorizeRoute = (req: Request, res: Response): void => {
  const options = getClientCredentialsOptions();
  getToken(options).then((response: Token) => {
    const { access_token, expires_in } = response;
    const token = signToken({ token: access_token }, expires_in);
    res.json({ token });
  });
};