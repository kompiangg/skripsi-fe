/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies, params }) {
	return {
		accessToken: cookies.get('accessToken'),
		slug: params.slug
	};
}
