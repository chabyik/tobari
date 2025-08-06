import express from 'express';
import bodyParser from 'body-parser';
import createError from 'http-errors';
import generateToken from './token/generateToken.js';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/token', async (req, res, next) => {
    const { action } = req.query;

    if (action == 'generate' && req.method == 'POST') {
        if (!req.body.code) next(createError(400));
        else {
            try {
                const token = await generateToken(req.body.code);
                res.json({ token });
                res.end();
            } catch (err) {
                next(err);
            }
        }
    }
});

app.use((req, res, next) => {
    next(createError(404));
});

app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status);
    res.json({ status, message: err.message });
    res.end();
});

export default app;