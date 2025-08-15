import express from 'express';
import locales from '../../../locales/ko_KR.json' with { type: 'json' };

const router = express.Router();

router.get('/', (req, res, next) => {
    res.locals = locales;
    res.render('index');
});

export const path = '/';
export { router as impl };