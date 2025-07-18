const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const path = require('path');
const fs = require('fs');

const ROUTES_DIR = path.join(__dirname, 'routes');
const VIEWS_DIR = path.join(__dirname, 'views');
const PUBLIC_DIR = path.join(__dirname, 'public');

const app = express();

app.set('views', VIEWS_DIR);
app.set('view engine', 'pug');
app.use(express.static(PUBLIC_DIR));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

fs.readdirSync(ROUTES_DIR).forEach(route => {
    const router = require(path.join(ROUTES_DIR, route));
    app.use(router.path, router.impl);
});

app.use((req, res, next) => {
    next(createError(404));
});

app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status);
    res.render('error', { status, message: err.message });
});

module.exports = app;