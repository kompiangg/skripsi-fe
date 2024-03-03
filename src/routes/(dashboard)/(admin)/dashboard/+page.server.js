import { parseJWTPayload } from '$lib/helpers/jwtDecoder';

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
	const accessToken = cookies.get('accessToken');

	return {
		accessToken
	};
}
