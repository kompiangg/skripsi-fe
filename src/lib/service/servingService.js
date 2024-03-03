// @ts-nocheck
import { servingServiceAPI } from '@/helpers/api';
import BigNumber from 'bignumber.js';
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

/**
 * @param {string} interval
 * @param {number} offset
 * @param {string} accessToken
 */
export async function getDashboard(interval, offset, accessToken) {
	const res = await servingServiceAPI.get(`/v1/dashboard`, {
		params: {
			interval,
			offset
		},
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});

	let data = res.data.data;

	const reverseChart = new Array();
	reverseChart.push(
		data.chart.forEach((/** @type {Object} */ element) => {
			reverseChart.unshift(element);
		})
	);
	reverseChart.pop();

	const doughnutColor = [
		'rgb(255, 99, 132)',
		'rgb(54, 162, 235)',
		'rgb(255, 205, 86)',
		'rgb(211,211,211)'
	];

	const doughnutChart = data.top_products.map((product, index) => {
		return {
			itemID: product.item_id,
			itemName: product.item_name,
			quantity: product.item_sold_total_quantity,
			percentage: BigNumber(product.item_sold_total_quantity)
				.div(data.item_sold_total_quantity)
				.multipliedBy(100)
				.toString(),
			color: doughnutColor[index]
		};
	});

	doughnutChart.push({
		itemID: '',
		itemName: 'Other',
		quantity: BigNumber(data.item_sold_total_quantity)
			.minus(
				BigNumber(
					doughnutChart.reduce((acc, cur) => {
						return acc + cur.quantity;
					}, 0)
				)
			)
			.toNumber(),
		percentage: BigNumber(data.item_sold_total_quantity)
			.minus(
				BigNumber(
					doughnutChart.reduce((acc, cur) => {
						return acc + cur.quantity;
					}, 0)
				)
			)
			.div(data.item_sold_total_quantity)
			.multipliedBy(100)
			.toString(),
		color: doughnutColor[3]
	});

	return {
		linearChart: [...reverseChart],
		doughnutChart,
		totalOrder: data.item_sold_total_quantity,
		totalIncome: BigNumber(data.item_sold_total_price).toString(),
		orderFromMember: data.total_customer_order_quantity,
		orderFromNotMember: data.total_not_customer_order_quantity
	};
}
