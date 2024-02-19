<script>
    import {
    CalendarDate
  } from "@internationalized/date";
	import CalendarWithRange from "@/components/calendar/calendar-with-range.svelte";

  /**
	 * @type {any}
	 */
  export let data;

  const now = new Date();
  const calendarDate = new CalendarDate(now.getFullYear(), now.getMonth()+1, now.getDate())

  const value = {
    start: calendarDate.subtract({ days: 7 }),
    end: calendarDate
  };
</script>

<h3>Order List</h3>

<div>
  <p>Filter Date Range</p>
  <CalendarWithRange {value}/>
</div>

<table>
  <thead>
    <tr>
      <th>Order ID</th>
      <th>Total Quantity</th>
      <th>Local Total Price</th>
      <th>Order Date</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {#if data.orders.length === 0 }
      <tr>
        <td colspan="5">No orders found</td>
      </tr>
    {:else}
      {#each data.orders as order}
        <tr>
          <td>{order.id}</td>
          <td>{order.totalQuantity}</td>
          <td>{order.localTotalPrice}</td>
          <td>{order.orderDate}</td>
          <td>
            <a data-sveltekit-reload href="/order-list/{order.id}">View</a>
          </td>
        </tr>
      {/each}
    {/if}
  </tbody>
</table>