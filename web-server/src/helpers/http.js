import axios from 'axios';

const http = axios.create({
  baseURL: 'https://ericbasbas.com/bimthinker',
});

export default http;
