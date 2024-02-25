<script >
  // @ts-nocheck

	import { onMount } from 'svelte';
  import { getOrderDetails } from '$lib/service/servingService';
  import Loading from '@/components/loading/loading.svelte';
	import dayjs from 'dayjs';

  export let data;

  let promise
  let order = {}

  promise = new Promise((resolve, reject) => {
    onMount(async () => {
      try {
        order = await getOrderDetails(data.slug, data.accessToken)
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  })
</script>

{#await promise}
  <Loading />
{:then _}
  <div class="flex flex-col gap-8 px-10 py-[60px]">
    <div class="bg-slate-200 text-slate-700 flex flex-col gap-8 px-8 py-8 rounded-md">
      <div>
        <subtle>Order ID</subtle>
        <h3>{order.id}</h3>
      </div>
    
      <div class="flex">
        <div class="border-r-[1px] border-r-slate-700 pr-5">
          <subtle>Cashier ID</subtle>
          <p class="font-bold">{order.cashier_id}</p>
        </div>
        <div class="border-r-[1px] border-r-slate-700 px-5">
          <subtle>Local Total Price</subtle>
          <p class="font-bold">{order.currency} {order.total_price}</p>
        </div>
        <div class="border-r-[1px] border-r-slate-700 px-5">
          <subtle>Total Quantity</subtle>
          <p class="font-bold">{order.total_unit}</p>
        </div>
        <div class="border-r-[1px] border-r-slate-700 px-5">
          <subtle>USD Rate</subtle>
          <p class="font-bold">{order.usd_rate} {order.currency}/USD</p>
        </div>
        <div class="border-r-slate-700 px-5">
          <subtle>Total Price in USD</subtle>
          <p class="font-bold">USD {order.total_price_in_usd}</p>
        </div>
      </div>
      
      <hr class="h-[1.5px] bg-slate-700">
      
      <div class="flex w-full justify-between gap-x-8">
        <div class="flex flex-col w-full justify-between">
          <div class="flex w-full justify-between">
            <subtle>Store ID</subtle>
            <subtle>{order.store_id}</subtle>
          </div>
        
          <div class="flex w-full justify-between">
            <subtle>Payment ID</subtle>
            <subtle>{order.payment_id}</subtle>
          </div>
        </div>

        <div class="w-[1.5px] bg-slate-700"></div>

        <div class="flex flex-col w-full justify-between">
          <div class="flex w-full justify-between">
            <subtle>Customer ID</subtle>
            <subtle>{order.customer_id}</subtle>
          </div>
        
          <div class="flex w-full justify-between">
            <subtle>Created At</subtle>
            <subtle>{dayjs(order.created_at).format('YYYY-MM-DD HH:mm:ss Z')}</subtle>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-y-4">
      <h3 class="px-5 py-5 border-b-[1.5px] border-black">Order Details</h3>
    
      <div class="px-5 py-5 w-full">
        <table class="w-full">
          <thead class="border-t-[1.5px] border-b-[1.5px] border-black">
            <tr>
              <th class="py-2 text-left">Item ID</th>
              <th class="py-2 text-left">Quantity</th>
              <th class="py-2 text-left">Unit</th>
              <th class="py-2 text-right">Price</th>
            </tr>
          </thead>
          <tbody>
            {#if order.order_details.length === 0}
              <tr>
                <td colspan="5">
                  <div class="mt-10">
                    <p class="font-bold">No orders found</p>
                  </div>
                </td>
              </tr>
            {:else}
              {#each order.order_details as item}
                <tr class="border-b-2 hover:bg-slate-200 transition-all ease-in-out duration-100">
                  <td class="py-2 text-left">{item.item_id}</td>
                  <td class="py-2 text-left">{item.quantity}</td>
                  <td class="py-2 text-left">{item.unit}</td>
                  <td class="py-2 text-right">{order.currency} {item.price}</td>
                </tr>
              {/each}
            {/if}
          </tbody>
        </table>
      </div>
    </div>
  </div>
{:catch error}
  <p>{error.message}</p>
{/await}