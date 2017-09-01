import axios from 'axios';
import config from '~/.env';

let instance = axios.create({
  baseURL: 'https://api.github.com/',
  auth: {
    username: config.GH_USERNAME,
    password: config.GH_PASSWORD,
  },
});

export default instance;
