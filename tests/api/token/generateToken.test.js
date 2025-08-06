import { jest, test, expect } from '@jest/globals';

test('Issues a token from the previously generated key.', async () => {
    const OLD_ENV = process.env;
    process.env = { ...OLD_ENV };

    process.env.AUTHENTICATION_GUILD_ID = '123456789';
    const user = {
        info: {
            id: '123456789',
            username: 'chabyik'
        },
        guilds: [
            { id: '123456789', name: 'Random Guild' },
            { id: '987654321', name: 'dliuG modnaR' }
        ]
    };
    const jwk = JSON.stringify({
        kty: 'oct',
        k: 'AbC1de2Fg34'
    });
    const cryptoKey = {
        type: 'secret',
        algorithm: { name: 'HMAC', length: 256, hash: { name: 'SHA-256' } }
    };
    const jwt = 'Abc1.de2Fg.34';
    jest.unstable_mockModule('../../../src/api/token/getUser', () => ({
        default: jest.fn().mockResolvedValue(user)
    }));
    jest.unstable_mockModule('fs', () => ({
        mkdirSync: jest.fn(),
        writeFileSync: jest.fn(),
        existsSync: jest.fn().mockReturnValue(true),
        readFileSync: jest.fn().mockReturnValue(jwk)
    }));
    jest.unstable_mockModule('jose', () => ({
        exportJWK: jest.fn(),
        generateSecret: jest.fn(),
        importJWK: jest.fn().mockResolvedValue(cryptoKey),
        SignJWT: jest.fn().mockImplementation(() => ({
            setProtectedHeader: jest.fn().mockReturnThis(),
            setIssuedAt: jest.fn().mockReturnThis(),
            setExpirationTime: jest.fn().mockReturnThis(),
            sign: jest.fn().mockResolvedValue(jwt)
        }))
    }));
    const getUser = (await import('../../../src/api/token/getUser')).default;
    const { existsSync, readFileSync } = await import('fs');
    const { importJWK, SignJWT } = await import('jose');
    const generateToken = (await import('../../../src/api/token/generateToken')).default;

    const userAuthCode = '123456789';

    const token = await generateToken(userAuthCode);
    expect(token).toEqual(jwt);
    process.env = OLD_ENV;
});