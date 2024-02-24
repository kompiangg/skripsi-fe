<script>
  import {
    CalendarDate
  } from "@internationalized/date";
	import CalendarWithRange from "@/components/calendar/calendar-with-range.svelte";
	import { getOrders } from "@/service/orderService";

  // export let data;

  /**
	 * @param {any} startDate
	 * @param {any} endDate
	 */
  async function fetchOrders(startDate, endDate) {
    const res = await getOrders(startDate, endDate);
    orders = res;
    return res;
  }

  let orders = [];

  const now = new Date('2023-12-31');
  const calendarDate = new CalendarDate(now.getFullYear(), now.getMonth()+1, now.getDate())
  const timePicker = {
    start: { hour: 0, minute: 0 },
    end: { hour: 23, minute: 59 }
  };

  let value = {
    start: calendarDate.subtract({ days: 7 }),
    end: calendarDate
  };
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
  </div>

  <div class="w-full">
    <div class="inline">
      <p>Total Order: {orders.length}</p>
    </div>
  
    <table class="w-full mt-4">
      <thead class="border-t-2 border-b-2 border-black">
        <tr>
          <th class="py-2 text-left">Order ID</th>
          <th class="py-2">Total Quantity</th>
          <th class="py-2">Local Total Price</th>
          <th class="py-2">Order Date</th>
          <th class="py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {#await fetchOrders(0,0)}
        <tr>
          <td colspan="5">
            <div class="mt-10">
              <p class="font-bold">Loading...</p>
            </div>
          </td>
        </tr>
        {:then posts}
          {#if posts.length === 0}
            <tr>
              <td colspan="5">
                <div class="mt-10">
                  <p class="font-bold">No orders found</p>
                </div>
              </td>
            </tr>
          {:else}
            {#each posts as post}
              <tr class="border-b-2">
                <td class="text-left py-2">{post.id}</td>
                <td class="py-2">{post.totalQuantity}</td>
                <td class="py-2">{post.localTotalPrice}</td>
                <td class="py-2">{post.orderDate}</td>
                <td class="py-2">
                  <a class="underline" data-sveltekit-reload href="/order-list/{post.id}">Details</a>
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