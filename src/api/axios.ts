import axios, { AxiosInstance } from 'axios';

const axiosClient: AxiosInstance = axios.create({ baseURL: import.meta.env.VITE_BACKEND_BASE_URL });

export default axiosClient;
