import { orderServiceAPI } from '@/helpers/api';
import dayjs from 'dayjs';

/**
 * @param {any} startDate
 * @param {any} endDate
 */
export async function getOrders(startDate, endDate) {
	// const res = await orderServiceAPI.get('/v1/orders', {
	// 	params: {
	// 		startDate: dayjs(startDate).format(),
	// 		endDate: dayjs(endDate).format()
	// 	}
	// });

	const res = {
		data: {
			data: [
				{
					id: '752abafb-d8cd-4923-a113-11ac4c77dde9',
					totalQuantity: '2',
					localTotalPrice: 'AFN 7.5',
					orderDate: '2023-12-31 08:00:00'
				}
			]
		}
	};

	return res.data.data;
}
