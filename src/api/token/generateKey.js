import { generateSecret, exportJWK } from 'jose';
import { fileURLToPath } from 'url';
import { mkdirSync, writeFileSync } from 'fs';
import path from 'path';
import config from '../../../config.json' with { type: 'json' };

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.join(__dirname, '..', '..');
const { jwk_file_path, jwk_file_name } = config.key;

export default async function () {
    const secret = await generateSecret('HS256', { extractable: true });
    const jwk = await exportJWK(secret);

    mkdirSync(path.join(ROOT_DIR, jwk_file_path), { recursive: true });
    writeFileSync(path.join(ROOT_DIR, jwk_file_path, jwk_file_name), JSON.stringify(jwk, null, 4));
};