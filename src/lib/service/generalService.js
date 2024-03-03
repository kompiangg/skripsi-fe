import { generalServiceAPI } from '@/helpers/api';

/**
 * @param {string} nameOrID
 */
export async function getItemByLikeNameOrID(nameOrID) {
	const res = await generalServiceAPI.get('/v1/items', {
		params: {
			name: nameOrID
		}
	});

	return res.data.data;
}

/**
 * @param {string} query
 */
export async function getPaymentMethod(query) {
	const res = await generalServiceAPI.get('/v1/payment-types', {
		params: {
			q: query
		}
	});

	return res.data.data;
}

/**
 * @param {string} query
 */
export async function getMembers(query) {
	const res = await generalServiceAPI.get('/v1/customers', {
		params: {
			q: query
		}
	});

	return res.data.data;
}

/**
 * @param {string} id
 * @param {string} accessToken
 */
export async function getCashierDetails(id, accessToken) {
	const res = await generalServiceAPI.get(`/v1/cashiers/${id}`, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});

	return res.data.data;
}
