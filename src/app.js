import api from './api/index.js';
import web from './web/index.js';
import logger from '../utils/logger.js';
import format from '../utils/format.js';
import config from '../config.json' with { type: 'json' };
import locales from '../locales/ko_KR.json' with { type: 'json' };

api.listen(config.api.port, () => {
    logger.info(format(locales.log.api_server_listening, config.api.port));
});

web.listen(config.web.port, () => {
    logger.info(format(locales.log.web_server_listening, config.web.port));
});