const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index');
});

module.exports = {
    path: '/',
    impl: router
};