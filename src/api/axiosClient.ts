import axios from 'axios';

const API_TOKEN = '68de50cbd7b591b4b78f1320';

export const axiosClient = axios.create({
  baseURL: `https://${API_TOKEN}.mockapi.io/api`,
  headers: { 'Content-Type': 'application/json' },
});
