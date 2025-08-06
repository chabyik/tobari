import { jest, test, expect } from '@jest/globals';

test('Get the user information from Discord.', async () => {
    const accessTokenResponse = { data: { access_token: 'AbC1de2Fg34' } };
    const userResponse = { data: { id: '123456789', username: 'chabyik' } };
    const userGuildsResponse = { data: [{ id: '123456789', name: 'Random Guild' }, { id: '987654321', name: 'dliuG modnaR' }] };
    jest.unstable_mockModule('axios', () => ({
        default: jest.fn().mockImplementation(async option => {
            const { method, url } = option;

            if (method == 'post' && url == 'https://discord.com/api/oauth2/token') return accessTokenResponse;
            if (method == 'get' && url == 'https://discord.com/api/users/@me') return userResponse;
            if (method == 'get' && url == 'https://discord.com/api/users/@me/guilds') return userGuildsResponse;    
        })
    }));
    const axios = (await import('axios')).default;
    const getUser = (await import('../../../src/api/token/getUser')).default;

    const tempCode = 123456;
    
    const userInfo = await getUser(tempCode);
    expect(userInfo).toEqual({ info: userResponse.data, guilds: userGuildsResponse.data });
});