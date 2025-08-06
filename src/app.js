import api from './api/index.js';
import web from './web/index.js';
import config from '../config.json' with { type: 'json' };

api.listen(config.api.port, () => {
    console.log(`API server is listening on ${config.api.port} port.`);
});

web.listen(config.web.port, () => {
    console.log(`Web server is listening on ${config.web.port} port.`);
});