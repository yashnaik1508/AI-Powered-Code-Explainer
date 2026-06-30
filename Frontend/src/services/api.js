import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const explainCode = async (language, code) => {
  const response = await api.post('/explain', { language, code });
  return response.data;
};

export default api;
