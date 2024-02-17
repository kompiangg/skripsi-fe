import { fail, redirect } from '@sveltejs/kit';
import { login } from '$lib/service/authService';
import { AxiosError } from 'axios';

/** @type {import('./$types').Actions} */
export const actions = {
	login: async ({ request, cookies }) => {
		const data = await request.formData();
		const username = data.get('username')?.toString();
		const password = data.get('password')?.toString();

		if (!username || !password) return fail(400, { errorMessage: 'Missing username or password' });

		let res;

		try {
			res = await login(username, password);

			cookies.set('accessToken', res.token, { path: '/' });
			cookies.set('role', res.role, { path: '/' });
		} catch (error) {
			if (error instanceof AxiosError) {
				const message = error?.response?.data.error.message;
				return fail(400, { errorMessage: message });
			}
		}

		if (res.role === 'admin') {
			redirect(303, '/dashboard');
		} else if (res.role === 'cashier') {
			redirect(303, '/new-order');
		}
	}
};
