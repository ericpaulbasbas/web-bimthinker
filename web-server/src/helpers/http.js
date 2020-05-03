import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:8001',
});

export default http;
