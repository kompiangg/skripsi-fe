// @ts-nocheck
import { ingestionServiceAPI } from '@/helpers/api';

export async function createOrder(
	orderItems,
	cashierID,
	paymentID,
	customerID,
	paymentDate,
	accessToken
) {
	const orderDetails = orderItems.map((item) => {
		return {
			item_id: item.id,
			quantity: item.quantity
		};
	});

	const payload = {
		payment_id: paymentID,
		customer_id: customerID,
		payment_date: paymentDate,
		order_details: orderDetails
	};

	const res = await ingestionServiceAPI.post('/v1/order', [payload], {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});

	return res.data.data;
}
