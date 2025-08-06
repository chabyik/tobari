import axios from 'axios';
import qs from 'qs';
import config from '../../../config.json' with { type: 'json' };
import 'dotenv/config';

export default async function (code) {
    try {
        const accessTokenResponse = await axios({
            method: 'post',
            url: 'https://discord.com/api/oauth2/token',
            data: qs.stringify({
                client_id: process.env.DISCORD_CLIENT_ID,
                client_secret: process.env.DISCORD_CLIENT_SECRET,
                grant_type: 'authorization_code',
                code,
                redirect_uri: `${config.url}/login`
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        const accessToken = accessTokenResponse.data.access_token;
        
        const userResponse = await axios({
            method: 'get',
            url: 'https://discord.com/api/users/@me',
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        });
        const userGuildsResponse = await axios({
            method: 'get',
            url: 'https://discord.com/api/users/@me/guilds',
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        });

        return { info: userResponse.data, guilds: userGuildsResponse.data };
    } catch (err) {
        throw err;
    }
};