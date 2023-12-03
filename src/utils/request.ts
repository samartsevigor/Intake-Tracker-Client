import axios from "axios";

import { ACCESS_TOKEN } from "#src/constants/constants";

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_APP_BACKEND_URL,
});

axiosInstance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem(ACCESS_TOKEN);
		if (token) {
			config.headers.Authorization = token;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (error.response && error.response.status === 401) {
			localStorage.removeItem(ACCESS_TOKEN);
		}
		return Promise.reject(error);
	},
);

export default axiosInstance;
