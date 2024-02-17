import { authAPI } from '$lib/helpers/api';

/**
 * @param {string} username
 * @param {string} password
 */
export async function login(username, password) {
	const res = await authAPI.post('/v1/session', { username, password });

	return res.data.data;
}

export async function logout() {
	localStorage.removeItem('accessToken');
	localStorage.removeItem('role');
}
