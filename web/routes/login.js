const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const config = require('../../config.json');
const router = express.Router();

dotenv.config();

router.get('/', async (req, res) => {
    if (req.cookies.access_token) res.send("<script>alert('이미 로그인이 되어있어요!');</script>").redirect('/');
    else {
        if (req.query.code) {
            try {
                const authHeader = `Basic ${Buffer.from(`${process.env.DISCORD_CLIENT_ID}:${process.env.DISCORD_CLIENT_TOKEN}`).toString('base64')}`;

                const discordResponse = await axios({
                    method: 'post',
                    url: 'https://discord.com/api/v10/oauth2/token',
                    data: {
                        grant_type: 'authorization_code',
                        code: req.query.code,
                        redirect_uri: `http://${config.domain}/login`
                    },
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        authorization: authHeader
                    }
                });

                const discordToken = discordResponse.data.access_token;
                const userResponse = await axios({
                    method: 'get',
                    url: 'https://discord.com/api/',
                    headers: {
                        authorization: `Bearer ${discordToken}`
                    }
                });
                console.log(userResponse.data);
                res.send("<script>alert('성공!'); location.href = '/';</script>");
                res.end();
            } catch (err) {
                console.log(err);
                res.send("<script>alert('야무지게 오류가 발생했네요!'); location.href = '/';</script>");
                res.end();
            }
        } else {
            res.redirect(`https://discord.com/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&response_type=code&redirect_uri=http%3A%2F%2F${config.domain}%2Flogin&scope=identify+email+guilds`);
        }
    }
});

module.exports = {
    path: '/login',
    impl: router
};