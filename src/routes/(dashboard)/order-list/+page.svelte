<script >
  // @ts-nocheck
  import {
    CalendarDate
  } from "@internationalized/date";
	import CalendarWithRange from "@/components/calendar/calendar-with-range.svelte";
	import { getBriefInformationsOrders } from "@/service/servingService";
	import dayjs from "dayjs";
	import { onMount } from "svelte";
  import Refresh from "$lib/components/icons/refresh.svelte";
  import Loading from "@/components/loading/loading.svelte";

  export let data;
  const accessToken = data.accessToken || "";

  let orders = [];

  const now = new Date('2023-12-31');
  const calendarDate = new CalendarDate(now.getFullYear(), now.getMonth()+1, now.getDate())
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
    let startDate = dayjs(value.start).set('hour', timePicker.start.hour).set('minute', timePicker.start.minute);
    let endDate = dayjs(value.end).set('hour', timePicker.end.hour).set('minute', timePicker.end.minute);

    const res = await getBriefInformationsOrders(startDate, endDate, accessToken);
    orders = res;
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

<div class="py-10 px-10 flex flex-col gap-y-8">
  <h3>Order List</h3>

  <div>
    <p>Date Range</p>
    <CalendarWithRange 
      bind:value
      bind:endTimeValue={timePicker.end}
      bind:startTimeValue={timePicker.start}
    />
    <subtle class="text-red-600 text-right" hidden={value.start}>Date range is required</subtle>
  </div>

  <div class="w-full">
    <div class="flex justify-between items-center">
      <p>Total Order: {orders.length}</p>
      <button on:click={reFetchOrders}>
        <div class="flex items-center justify-center rounded-lg h-[40px] w-[40px] bg-white hover:bg-slate-200">
          <Refresh class="h-4 w-4" />
        </div>
      </button>
    </div>
  
    <table class="w-full mt-4">
      <thead class="border-t-2 border-b-2 border-black">
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
              <Loading/>
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
              <tr class="border-b-2 hover:bg-slate-200 transition-all ease-in-out duration-100">
                <td class="text-left py-2">{order.id}</td>
                <td class="text-left py-2">{order.total_quantity}</td>
                <td class="text-left py-2">{order.currency} {order.total_price}</td>
                <td class="text-left py-2">{dayjs(order.created_at).format('YYYY-MM-DD HH:mm:ss Z')}</td>
                <td class="text-left py-2">
                  <a class="underline" data-sveltekit-reload href="/order-list/{order.id}">Details</a>
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