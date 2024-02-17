/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	if (event.route.id?.split('/').includes('(dashboard)')) {
		return await handleDashboardGroupHooks({ event, resolve });
	}

	return resolve(event);
}

/** @type {import('@sveltejs/kit').Handle} */
async function handleDashboardGroupHooks({ event, resolve }) {
	const accessToken = event.cookies.get('accessToken');
	const role = event.cookies.get('role');
	const roleGroup = event.route.id?.split('/')[2];

	if (!accessToken) {
		return Response.redirect(`${event.url.origin}/login`);
	}

	if (roleGroup === '(admin)' && role !== 'admin') {
		return Response.redirect(`${event.url.origin}/error`);
	}

	if (roleGroup === '(cashier)' && role !== 'cashier') {
		return Response.redirect(`${event.url.origin}/error`);
	}

	return resolve(event);
}
