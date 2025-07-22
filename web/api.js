const axios = require('axios');

module.exports = axios.create({
    baseURL: `http://gateway/api/`,
    timeout: 1000
});