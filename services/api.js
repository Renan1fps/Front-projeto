import axios from 'axios';
//import { getAccessToken, getBaseUrl, handleAxiosError } from '../utils/api';

//const token = getAccessToken();
export const api = axios.create({
    baseURL: "https://localhost:7294",
    headers: {
        mode: 'cors',
        Authorization: `Bearer ${null}`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Authorization",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
        "Content-Type": "application/json;charset=UTF-8"
    }
});

/*api.interceptors.response.use((response) => response, async (error) => {
  if (error.response.status === 401) {
    localStorage.removeItem('token');
    window.location.reload();
  }
  return await new Promise((_resolve, reject) => reject(handleAxiosError(error)));
});*/