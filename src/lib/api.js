import _axios from 'axios';

const axios = _axios.create({
  baseURL: window['runConfig'].apiBaseURL,
  headers: {
    'Accept': 'application/json', 
    'Content-Type': 'application/json', 
    'X-Requested-With': 'XMLHttpRequest',
    'X-XSS-Protection': '1; mode=block',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
  },
  timeout: 300000,
});

export const getItems = () => axios.get('Items');