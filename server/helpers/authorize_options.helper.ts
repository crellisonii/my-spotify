import { callback_url, client_id, client_secret } from "../environment_variables";
import { AuthorizationCodeForm,
    AuthorizationCodeOptions,
    AuthorizationHeader,
    AuthorizationOptions,
    ClientCredentialsForm,
    ClientCredentialsOptions,
    RefreshTokenForm,
    RefreshTokenOptions
} from "../interfaces";
import { authorization_code, client_credentials, refresh_token, tokenUrl } from "../constants";


const authorization = `Basic ${Buffer.from(
    `${client_id}:${client_secret}`
).toString("base64")}`;

const getSharedOptions = (url: string): AuthorizationOptions => {
    return {
        method: "POST",
        json: true,
        url: url
    };
};

export const getAuthorizationCodeOptions = (
    code: string
): AuthorizationCodeOptions => {
    return {
        ...getSharedOptions(tokenUrl),
        form: getAuthorizationCodeForm(code),
        headers: getAuthorizationHeader()
    };
};

const getAuthorizationCodeForm = (code: string): AuthorizationCodeForm => {
    return {
        code: code,
        redirect_uri: callback_url!,
        grant_type: authorization_code
    };
};

export const getClientCredentialsOptions = (): ClientCredentialsOptions => {
    return {
        ...getSharedOptions(tokenUrl),
        form: getClientCredentialsForm(),
        headers: getAuthorizationHeader()
    };
};

const getClientCredentialsForm = (): ClientCredentialsForm => {
    return {
        grant_type: client_credentials
    };
};

export const getRefreshTokenOptions = (
    refreshToken: string
): RefreshTokenOptions => {
    return {
        ...getSharedOptions(tokenUrl),
        form: getRefreshTokenForm(refreshToken),
        headers: getAuthorizationHeader()
    };
};

const getRefreshTokenForm = (refreshToken: string): RefreshTokenForm => {
    return {
        grant_type: refresh_token,
        refresh_token: refreshToken
    };
};

const getAuthorizationHeader = (): AuthorizationHeader => {
    return {
        Authorization: authorization
    };
};