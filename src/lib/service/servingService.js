import { servingServiceAPI } from '@/helpers/api';
import dayjs from 'dayjs';

/**
 * @param {any} startDate
 * @param {any} endDate
 * @param {string} accessToken
 */
export async function getBriefInformationsOrders(startDate, endDate, accessToken) {
	const res = await servingServiceAPI.get('/v1/orders', {
		params: {
			start_date: dayjs(startDate).format(),
			end_date: dayjs(endDate).format()
		},
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});

	return res.data.data;
}

/**
 * @param {string} orderID
 * @param {string} accessToken
 */
export async function getOrderDetails(orderID, accessToken) {
	const res = await servingServiceAPI.get(`/v1/orders/${orderID}`, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});

	return res.data.data;
}
