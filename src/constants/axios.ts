import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;
const baseAxios = axios.create({ baseURL });

export default baseAxios;
