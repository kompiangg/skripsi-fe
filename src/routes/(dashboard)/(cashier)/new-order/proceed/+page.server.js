import { parseJWTPayload } from '$lib/helpers/jwtDecoder';

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
	const accessToken = cookies.get('accessToken');
	const jwtPayload = parseJWTPayload(accessToken);

	return {
		accessToken,
		accountInfo: {
			id: jwtPayload.sub,
			role: jwtPayload.role,
			name: jwtPayload.name
		}
	};
}
