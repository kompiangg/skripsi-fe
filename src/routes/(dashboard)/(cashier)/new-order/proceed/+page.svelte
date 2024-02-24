<script>
  import { ordersStore } from "@/stores/orders";
  import Calendar from "@/components/calendar/calendar.svelte";
	import { CalendarDate, Time } from "@internationalized/date";
  import * as Dialog from "$lib/components/ui/dialog";
  import { Button, buttonVariants } from "$lib/components/ui/button";
	import { goto } from "$app/navigation";
  /**
	 * @type {any[]}
	 */
  let orders = $ordersStore;
  let totalQuantity = 0;
  let totalPrice = 0;

  let paymentMethod = '';
  let memberInformation = '';

  let dateValue = new CalendarDate(2023, 12, 31);
  let timeValue = new Time(12, 58, 0);

  $: totalQuantity = orders.reduce((acc, item) => acc + item.quantity, 0);
  $: totalPrice = orders.reduce((acc, item) => acc + Number(item.price.split(' ')[1]), 0);

  let orderID = '';

  async function pay() {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    orderID = '752abafb-d8cd-4923-a113-11ac4c77dde9'
  }
</script>

<div class="flex flex-col gap-8 px-10 py-[60px]">
  <h3>Payment</h3>
  
  <div class="flex justify-between gap-x-28">
    <div class="flex flex-col gap-y-2 w-full">
      <h4>Payment Method</h4>
      <input class="w-full h-[60%]" placeholder="Payment Method" type="text" name="payment-method" id="payment-method">
    </div>
  
    <div class="flex flex-col gap-y-2 w-full">
      <h4>Member Information</h4>
      <input class="w-full h-[60%]" placeholder="Member Information" type="text" name="member-information" id="member-information">
    </div>
  </div>

  <div>
    <h4 class="mb-2">Payment Date</h4>
    <Calendar
      bind:value={dateValue}
      bind:timeValue={timeValue}
    />
  </div>
  
  <div>
    <h4 class="mb-2">Order Information</h4>
    <div class="gap-y-4 py-4 px-4 bg-white rounded-md">
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
                <div class="mt-5">
                  No orders yet
                </div>
              </td>
            </tr>
          {:else}
            {#each orders as order}
              <tr>
                <td class="py-2 text-left">{order.name}</td>
                <td class="py-2">{order.price}</td>
                <td class="py-2">{order.quantity}</td>
                <td class="py-2 text-right">AFN {order.price.split(' ')[1] * order.quantity}</td>
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
        <p>AFN {totalPrice}</p>
      </div>
    </div>
  
    <div >
      <Dialog.Root>
        <Dialog.Trigger disabled={orders.length === 0} class="px-20 py-3 rounded-md bg-green-700 text-white hover:bg-green-800 disabled:bg-green-600">
          Pay
        </Dialog.Trigger >
        <Dialog.Content>
          {#await pay()}
            <Dialog.Header>
              <Dialog.Title class="flex justify-center mt-4 mb-4">
                <h4 class="text-black font-normal">
                  Creating your order...
                </h4>
              </Dialog.Title>
            </Dialog.Header>
          {:then}
            <Dialog.Header>
              <Dialog.Title class="flex justify-center mb-4">
                <div class="w-24 h-24 bg-green-700">
                  
                </div>
              </Dialog.Title>
              <Dialog.Description class="flex justify-center text-center">
                <h4 class="text-black font-normal">
                  Your order created with id <br> <span class="font-bold">{orderID}</span>
                </h4>
              </Dialog.Description>
            </Dialog.Header>
            <Dialog.Footer class="mt-2">
              <div class="w-full flex justify-center">
                <Button type="submit" class="bg-green-700 text-white hover:bg-green-800" on:click={() => {
                  ordersStore.set([]);
                  goto('/new-order')
                }}>OK</Button>
              </div>
            </Dialog.Footer>
          {:catch error}
            <Dialog.Header>
              <Dialog.Title class="flex justify-center mb-4">
                <div class="w-24 h-24 bg-red-700">
                  
                </div>
              </Dialog.Title>
              <Dialog.Description class="flex flex-col justify-center text-center">
                <h4 class="text-black font-normal">
                  Your order failed to create
                </h4>
                <p class="text-left w-full p-2 bg-red-400 text-red-100 rounded-md">Error: {error?.message}</p>
              </Dialog.Description>
            </Dialog.Header>
            <Dialog.Footer class="mt-2">
              <div class="w-full flex justify-center">
                <Button type="submit" class="bg-red-700 text-white hover:bg-red-800" on:click={() => {
                  goto('/new-order')
                }}>OK</Button>
              </div>
            </Dialog.Footer>
          {/await}
        </Dialog.Content>
      </Dialog.Root>
    </div>
  </div>
</div>