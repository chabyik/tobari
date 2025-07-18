const api = require('./api');
const web = require('./web');
const config = require('./config.json');

api.listen(config.api.port, () => {
    console.log(`API server is listening on ${config.api.port} port.`);
});

web.listen(config.web.port, () => {
    console.log(`Web server is listening on ${config.web.port} port.`);
});