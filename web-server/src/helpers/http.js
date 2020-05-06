import axios from 'axios';

const http = axios.create({
  baseURL: 'http://35.232.21.63:8001',
});

export default http;
