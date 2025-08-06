import { SignJWT, importJWK } from 'jose';
import { fileURLToPath } from 'url';
import { existsSync, readFileSync } from 'fs';
import createError from 'http-errors';
import path from 'path';
import getUser from './getUser.js';
import generateKey from './generateKey.js';
import config from '../../../config.json' with { type: 'json' };
import 'dotenv/config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const { jwk_file_path, jwk_file_name } = config.key;
const ROOT_DIR = path.join(__dirname, '..', '..');

export default async function (code) {
    const user = await getUser(code);
    let authenticated = false;

    for (let guild of user.guilds) {
        if (guild.id === process.env.AUTHENTICATION_GUILD_ID) authenticated = true;
    }

    if (!authenticated) throw createError(401);
    if (!existsSync(path.join(ROOT_DIR, jwk_file_path, jwk_file_name))) await generateKey();

    const jwk = JSON.parse(readFileSync(path.join(ROOT_DIR, jwk_file_path, jwk_file_name), 'utf8'));
    const secret = await importJWK(jwk, 'HS256');

    const token = await new SignJWT({ id: user.info.id, username: user.info.username, backend: false })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1w')
        .sign(secret);
    
    return token;
};