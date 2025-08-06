import axios from 'axios';

export default axios.create({
    baseURL: `http://gateway/api/`,
    timeout: 1000
});