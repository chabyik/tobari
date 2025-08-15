import express from 'express';
import api from '../apiInstance.js';
import format from '../../../utils/format.js';
import config from '../../../config.json' with { type: 'json' };
import locales from '../../../locales/ko_KR.json' with { type: 'json' };
import 'dotenv/config';

const login = locales.web.main.login;
const router = express.Router();

router.get('/', async (req, res) => {
    if (req.cookies.token) res.send(`<script>alert('${login.already_logged_in}');</script>`).redirect('/');
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

                res.cookie('token', tokenResponse.data.token, { maxAge: 604800000, httpOnly: true, sameSite: 'strict', secure: true });
                res.send(`<script>alert('${login.login_successful}'); location.href = '/';</script>`);
                res.end();
            } catch (err) {
                if (err.status == 401) {
                    res.status(401);
                    res.send(`<script>alert('${login.error_401}'); location.href = '/';</script>`);
                    res.end();
                } else {
                    console.log(err);
                    res.send(`<script>alert('${format(login.error_others, err.status || 500, err.message)}'); location.href = '/';</script>`);
                    res.end();
                }
            }
        } else {
            res.redirect(`https://discord.com/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(config.url)}%2Flogin&scope=identify+email+guilds`);
        }
    }
});

export const path = '/login';
export { router as impl };