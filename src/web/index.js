import { fileURLToPath } from 'url';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import createError from 'http-errors';
import path from 'path';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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

for (let route of fs.readdirSync(ROUTES_DIR)) {
    const router = await import(path.join(ROUTES_DIR, route));
    app.use(router.path, router.impl);
}

app.use((req, res, next) => {
    next(createError(404));
});

app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status);
    res.render('error', { status, message: err.message });
});

export default app;