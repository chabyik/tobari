import { jest, test, expect } from '@jest/globals';

test('Creates a hash key file for token signing.', async () => {
    const cryptoKey = {
        type: 'secret',
        algorithm: { name: 'HMAC', length: 256, hash: { name: 'SHA-256' } }
    };
    const jwk = { kty: 'oct', k: 'AbC1de2Fg34' };
    jest.unstable_mockModule('jose', () => ({
        generateSecret: jest.fn().mockResolvedValue(cryptoKey),
        exportJWK: jest.fn().mockResolvedValue(jwk)
    }));
    jest.unstable_mockModule('fs', () => ({
        mkdirSync: jest.fn(),
        writeFileSync: jest.fn()
    }));
    const { generateSecret, exportJWK } = await import('jose');
    const { mkdirSync, writeFileSync } = await import('fs');
    const generateKey = (await import('../../../src/api/token/generateKey')).default;

    await generateKey();

    expect(writeFileSync).toHaveBeenCalledWith(expect.anything(), JSON.stringify(jwk, null, 4));
});