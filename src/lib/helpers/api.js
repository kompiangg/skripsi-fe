import { env } from '$env/dynamic/public';
import axios from 'axios';

export const authAPI = axios.create({
	baseURL: env.PUBLIC_AUTH_SERVICE
});

export const servingServiceAPI = axios.create({
	baseURL: env.PUBLIC_SERVING_SERVICE
});
