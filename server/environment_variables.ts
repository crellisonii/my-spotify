import dotenv from 'dotenv';
dotenv.config({ path: `${__dirname}/.env` });

export const client_id = process.env.CLIENT_ID;
export const client_secret = process.env.CLIENT_SECRET;
export const jwt_secret = process.env.JWT_SECRET;
export const server_port = process.env.PORT;
export const callback_url = process.env.CALLBACK_URL;