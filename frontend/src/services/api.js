import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

if (!API_BASE_URL) {
  console.error(
    '[PagePulse] VITE_API_URL is not defined. ' +
    'Ensure a .env (development) or .env.production (production) file exists ' +
    'with VITE_API_URL set to the backend URL.'
  );
}

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
