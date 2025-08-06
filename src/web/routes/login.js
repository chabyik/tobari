import express from 'express';
import config from '../../../config.json' with { type: 'json' };
import api from '../apiInstance.js';
import 'dotenv/config';

const router = express.Router();

router.get('/', async (req, res) => {
    if (req.cookies.access_token) res.send("<script>alert('이미 로그인이 되어있어요!');</script>").redirect('/');
    else {
        if (req.query.code) {
            try {
                const tokenResponse = await api({
                    method: 'post',
                    url: 'token',
                    params: {
                        action: 'generate'
                    },
                    data: {
                        code: req.query.code
                    }
                });

                console.log(tokenResponse.data.token);

                res.send("<script>alert('성공!'); location.href = '/';</script>");
                res.end();
            } catch (err) {
                console.log(err);
                res.send("<script>alert('야무지게 오류가 발생했네요!'); location.href = '/';</script>");
                res.end();
            }
        } else {
            res.redirect(`https://discord.com/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(config.url)}%2Flogin&scope=identify+email+guilds`);
        }
    }
});

export const path = '/login';
export { router as impl };