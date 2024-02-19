/** @type {import('./$types').PageServerLoad} */
export async function load() {
	return {
		orders: [
			{
				id: '123',
				totalQuantity: '',
				localTotalPrice: '',
				orderDate: ''
			}
		]
	};
}
