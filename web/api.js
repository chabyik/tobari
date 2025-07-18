const axios = require('axios');
const config = require('../config.json');

module.exports = axios.create({
    baseURL: `http://127.0.0.1:${config.api.port}`,
    timeout: 1000
});