export interface AuthorizeParams {
    response_type: string;
    client_id: string;
    scope: string;
    redirect_uri: string;
    state: string;
}

export interface AuthorizationOptions {
    method: string;
    url: string;
    json: boolean;
}

export interface AuthorizationCodeOptions extends AuthorizationOptions {
    form: AuthorizationCodeForm;
    headers: AuthorizationHeader;
}

export interface AuthorizationCodeForm {
    code: string;
    redirect_uri: string;
    grant_type: string;
}

export interface ClientCredentialsOptions extends AuthorizationOptions {
    form: ClientCredentialsForm;
    headers: AuthorizationHeader;
}

export interface ClientCredentialsForm {
    grant_type: string;
}

export interface RefreshTokenOptions extends AuthorizationOptions {
    form: RefreshTokenForm;
    headers: AuthorizationHeader;
}

export interface RefreshTokenForm {
    grant_type: string;
    refresh_token: string;
}

export interface AuthorizationHeader {
    Authorization: string;
}

export interface TokenResponse {
    token: string;
    refresh?: string;
}