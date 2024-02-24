/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
	return {
		accessToken: cookies.get('accessToken')
	};
}
