// @ts-nocheck
import { ingestionServiceAPI } from '@/helpers/api';
import { getCashierDetails } from '@/service/generalService';

export async function createOrder(
	orderItems,
	cashierID,
	paymentID,
	customerID,
	paymentDate,
	currency,
	accessToken
) {
	const cashierDetails = await getCashierDetails(cashierID, accessToken);

	const orderDetails = orderItems.map((item) => {
		return {
			item_id: item.id,
			quantity: item.quantity
		};
	});

	const payload = {
		store_id: cashierDetails.store_id,
		payment_id: paymentID,
		customer_id: customerID,
		payment_date: paymentDate,
		currency: currency,
		order_details: orderDetails
	};

	const res = await ingestionServiceAPI.post('/v1/order', [payload], {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});

	return res.data.data;
}
