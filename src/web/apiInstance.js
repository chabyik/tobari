import axios from 'axios';
import config from '../../config.json' with { type: 'json' };

export default axios.create({
    baseURL: new URL('/api', config.url).href,
    timeout: 1000
});