import { env } from '$env/dynamic/public';
import axios from 'axios';

export const authAPI = axios.create({
	baseURL: env.PUBLIC_AUTH_SERVICE
});

export const orderServiceAPI = axios.create({
	baseURL: env.PUBLIC_ORDER_SERVICE
});
