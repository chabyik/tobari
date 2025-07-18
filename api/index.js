const express = require('express');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const tokenGenerate = require('./token/generate');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/token', (req, res) => {
    const { action } = req.query;

    if (action == 'generate' && req.method == 'POST') tokenGenerate(req, res);
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

module.exports = app;