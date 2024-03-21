<script>
	// @ts-nocheck

	import { ordersStore } from '@/stores/orders';
	import Calendar from '@/components/calendar/calendar.svelte';
	import { CalendarDate, Time } from '@internationalized/date';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import { getPaymentMethod, getMembers } from '$lib/service/generalService';
	import { createOrder } from '$lib/service/ingestionService';
	import { goto } from '$app/navigation';
	import Select from 'svelte-select';
	import dayjs from 'dayjs';

	export let data;

	let orders = $ordersStore;
	let totalQuantity = 0;
	let totalPrice = 0;

	let dateValue = new CalendarDate(2023, 12, 31);
	let timeValue = new Time(12, 58, 0);

	let orderID = '';
	let paymentMethod = null;
	let paymentMethods = null;
	let memberInformation = null;
	let memberInformations = null;

	$: totalQuantity = orders.reduce((acc, item) => acc + item.quantity, 0);
	$: totalPrice = orders.reduce((acc, item) => acc + Number(item.price), 0);

	async function pay() {
		let memberInformationID = null;

		if (memberInformation) {
			memberInformationID = memberInformation.id;
		}

		const accessToken = data.accessToken;
		const second = dayjs().second();

		const paidOrder = await createOrder(
			orders,
			data.accountInfo.id,
			paymentMethod.id,
			memberInformationID,
			dayjs(
				`${dateValue.year}-${dateValue.month}-${dateValue.day} ${timeValue.hour}:${timeValue.minute}:${second}`
			).format('YYYY-MM-DDTHH:mm:ssZ'),
			accessToken
		);

		orderID = paidOrder[0].id;

		return;
	}

	async function loadPaymentMethod(filterText) {
		paymentMethods = await getPaymentMethod(filterText);
		return paymentMethods;
	}

	async function loadMemberInformation(filterText) {
		memberInformations = await getMembers(filterText);
		return memberInformations;
	}
</script>

<svelte:head>
	<title>Proceed New Order</title>
</svelte:head>

<div class="flex flex-col gap-8 px-10 py-[60px]">
	<h3>Payment</h3>

	<div class="flex justify-between gap-x-28">
		<div class="flex w-full flex-col gap-y-2">
			<h4>Payment Method</h4>
			<div class="h-full w-full rounded-lg bg-white">
				<Select
					class="w-full text-black"
					loadOptions={loadPaymentMethod}
					itemId="id"
					placeholder="Payment Method"
					bind:value={paymentMethod}
				>
					<div slot="item" let:item let:index>
						<div class="flex items-center gap-x-2">
							<p>{item.id} - {item.type} {item.bank == 'None' ? '' : `- ${item.bank}`}</p>
						</div>
					</div>

					<div slot="selection" let:selection>
						<div class="flex items-center gap-x-2">
							<p>
								{selection.id} - {selection.type}
								{selection.bank == 'None' ? '' : `- ${selection.bank}`}
							</p>
						</div>
					</div>
				</Select>
			</div>
		</div>

		<div class="flex w-full flex-col gap-y-2">
			<h4>Member Information</h4>
			<div class="h-full w-full rounded-lg bg-white">
				<Select
					class="w-full text-black"
					loadOptions={loadMemberInformation}
					itemId="id"
					placeholder="Member Information"
					bind:value={memberInformation}
				>
					<div slot="item" let:item let:index>
						<div class="flex items-center gap-x-2">
							<p>{item.id} - {item.name} - {item.contact}</p>
						</div>
					</div>

					<div slot="selection" let:selection>
						<div class="flex items-center gap-x-2">
							<p>{selection.id} - {selection.name} - {selection.contact}</p>
						</div>
					</div>
				</Select>
			</div>
		</div>
	</div>

	<div>
		<h4 class="mb-2">Payment Date</h4>
		<Calendar bind:value={dateValue} bind:timeValue />
	</div>

	<div>
		<h4 class="mb-2">Order Information</h4>
		<div class="gap-y-4 rounded-md bg-white px-4 py-4">
			<table class="w-full">
				<thead class="border-b-2 border-black">
					<tr>
						<th class="py-2 text-left">Name</th>
						<th class="py-2">Price</th>
						<th class="py-2">Quantity</th>
						<th class="py-2 text-right">Sub-Total</th>
					</tr>
				</thead>
				<tbody>
					{#if orders.length === 0}
						<tr>
							<td colspan="5">
								<div class="mt-5">No orders yet</div>
							</td>
						</tr>
					{:else}
						{#each orders as order}
							<tr>
								<td class="py-2 text-left">{order.name}</td>
								<td class="py-2">{order.currency} {order.price}</td>
								<td class="py-2">{order.quantity}</td>
								<td class="py-2 text-right">{order.currency} {order.price * order.quantity}</td>
							</tr>
						{/each}
					{/if}
				</tbody>
			</table>
		</div>
	</div>

	<div class="flex items-center gap-x-8">
		<div class="w-[100%]">
			<div class="flex w-full justify-between">
				<p>Total Quantity</p>
				<p>{totalQuantity}</p>
			</div>
			<div class="flex w-full justify-between">
				<p>Total Price</p>
				<p>BDT {totalPrice}</p>
			</div>
		</div>

		<div>
			<Dialog.Root>
				<Dialog.Trigger
					disabled={orders.length === 0 || !paymentMethod}
					class="rounded-md bg-green-700 px-20 py-3 text-white hover:bg-green-800 disabled:bg-green-600"
				>
					Pay
				</Dialog.Trigger>
				<Dialog.Content>
					{#await pay()}
						<Dialog.Header>
							<Dialog.Title class="mb-4 mt-4 flex justify-center">
								<h4 class="font-normal text-black">Creating your order...</h4>
							</Dialog.Title>
						</Dialog.Header>
					{:then}
						<Dialog.Header>
							<Dialog.Title class="mb-4 flex justify-center">
								<div class="h-24 w-24 bg-green-700"></div>
							</Dialog.Title>
							<Dialog.Description class="flex justify-center text-center">
								<h4 class="font-normal text-black">
									Your order created with id <br /> <span class="font-bold">{orderID}</span>
								</h4>
							</Dialog.Description>
						</Dialog.Header>
						<Dialog.Footer class="mt-2">
							<div class="flex w-full justify-center">
								<Button
									type="submit"
									class="bg-green-700 text-white hover:bg-green-800"
									on:click={() => {
										ordersStore.set([]);
										goto('/new-order');
									}}>OK</Button
								>
							</div>
						</Dialog.Footer>
					{:catch error}
						<Dialog.Header>
							<Dialog.Title class="mb-4 flex justify-center">
								<div class="h-24 w-24 bg-red-700"></div>
							</Dialog.Title>
							<Dialog.Description class="flex flex-col justify-center text-center">
								<h4 class="font-normal text-black">Your order failed to create</h4>
								<p class="w-full rounded-md bg-red-400 p-2 text-left text-red-100">
									Error: {error?.message}
								</p>
							</Dialog.Description>
						</Dialog.Header>
						<Dialog.Footer class="mt-2">
							<div class="flex w-full justify-center">
								<Button
									type="submit"
									class="bg-red-700 text-white hover:bg-red-800"
									on:click={() => {
										goto('/new-order');
									}}>OK</Button
								>
							</div>
						</Dialog.Footer>
					{/await}
				</Dialog.Content>
			</Dialog.Root>
		</div>
	</div>
</div>
