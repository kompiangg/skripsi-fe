<script>
	// @ts-nocheck
	import { CalendarDate } from '@internationalized/date';
	import CalendarWithRange from '@/components/calendar/calendar-with-range.svelte';
	import { getBriefInformationsOrders } from '@/service/servingService';
	import dayjs from 'dayjs';
	import { onMount } from 'svelte';
	import Refresh from '$lib/components/icons/refresh.svelte';
	import Loading from '@/components/loading/loading.svelte';
	import BigNumber from 'bignumber.js';

	export let data;
	const accessToken = data.accessToken || '';

	let orders = [];
	let totalAllPrice = new BigNumber(0);

	const now = new Date('2023-12-31');
	const calendarDate = new CalendarDate(now.getFullYear(), now.getMonth() + 1, now.getDate());
	const timePicker = {
		start: { hour: 0, minute: 0 },
		end: { hour: 23, minute: 59 }
	};

	let value = {
		start: calendarDate.subtract({ days: 2 }),
		end: calendarDate
	};

	let promise;

	async function fetchOrders() {
		let startDate = dayjs(value.start)
			.set('hour', timePicker.start.hour)
			.set('minute', timePicker.start.minute)
			.set('second', 0);
		let endDate = dayjs(value.end)
			.set('hour', timePicker.end.hour)
			.set('minute', timePicker.end.minute)
			.set('second', 59);

		const res = await getBriefInformationsOrders(startDate, endDate, accessToken);
		orders = res;

		orders.forEach((o) => {
			totalAllPrice = totalAllPrice.plus(o.total_price);
		});

		return res;
	}

	promise = new Promise((resolve) => {
		onMount(async () => {
			await fetchOrders();
			resolve();
		});
	});

	async function reFetchOrders() {
		orders = [];
		promise = new Promise(async (resolve) => {
			await fetchOrders();
			resolve();
		});
	}
</script>

<svelte:head>
	<title>Order List</title>
</svelte:head>

<div class="flex flex-col gap-y-8 px-10 py-10">
	<h3>Order List</h3>

	<div>
		<p>Date Range</p>
		<CalendarWithRange
			bind:value
			bind:endTimeValue={timePicker.end}
			bind:startTimeValue={timePicker.start}
		/>
		<subtle class="text-right text-red-600" hidden={value.start}>Date range is required</subtle>
	</div>

	<div class="w-full">
		<div class="flex items-center justify-between">
			<p>Total Order: {orders.length}</p>
			<p>Total All Price: {totalAllPrice}</p>
			<button on:click={reFetchOrders}>
				<div
					class="flex h-[40px] w-[40px] items-center justify-center rounded-lg bg-white hover:bg-slate-200"
				>
					<Refresh class="h-4 w-4" />
				</div>
			</button>
		</div>

		<table class="mt-4 w-full">
			<thead class="border-b-2 border-t-2 border-black">
				<tr>
					<th class="py-2 text-left">Order ID</th>
					<th class="py-2 text-left">Total Quantity</th>
					<th class="py-2 text-left">Local Total Price</th>
					<th class="py-2 text-left">Order Date</th>
					<th class="py-2 text-left">Actions</th>
				</tr>
			</thead>
			<tbody>
				{#await promise}
					<tr>
						<td colspan="5">
							<div class="h-[60vh]">
								<Loading />
							</div>
						</td>
					</tr>
				{:then _}
					{#if orders.length === 0}
						<tr>
							<td colspan="5">
								<div class="mt-10">
									<p class="font-bold">No orders found</p>
								</div>
							</td>
						</tr>
					{:else}
						{#each orders as order}
							<tr class="border-b-2 transition-all duration-100 ease-in-out hover:bg-slate-200">
								<td class="py-2 text-left">{order.id}</td>
								<td class="py-2 text-left">{order.total_quantity}</td>
								<td class="py-2 text-left">{order.currency} {order.total_price}</td>
								<td class="py-2 text-left"
									>{dayjs(order.created_at).format('YYYY-MM-DD HH:mm:ss Z')}</td
								>
								<td class="py-2 text-left">
									<a class="underline" data-sveltekit-reload href="/order-list/{order.id}"
										>Details</a
									>
								</td>
							</tr>
						{/each}
					{/if}
				{:catch error}
					<p>{error.message}</p>
				{/await}
			</tbody>
		</table>
	</div>
</div>
