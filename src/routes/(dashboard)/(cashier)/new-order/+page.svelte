<script>
  // @ts-nocheck
	import { goto } from "$app/navigation";
  import { ordersStore } from "@/stores/orders";

  let itemID = '';

  let orders = $ordersStore;

  let totalQuantity = 0;
  let totalPrice = 0;
  let currency = 'AFN';
  let isAddItemDisable = true;
  let itemInput = '';

  $: totalQuantity = orders.reduce((acc, item) => acc + item.quantity, 0);
  $: totalPrice = orders.reduce((acc, item) => acc + Number(item.price.split(' ')[1]) * item.quantity, 0);

  function addItem() {
    orders = [
      ...orders,
      {
        name: 'Item 2',
        price: 'AFN 10',
        quantity: 2
      }
    ];

    ordersStore.set(orders);

    itemInput = '';
    isAddItemDisable = true;
  }

  function deleteItem(event) {
    const idx = event.target.getAttribute('aria-label');
    orders = orders.filter((_, i) => i != idx);
  }

  let timeout;

  function handleItemIDInput(event) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      itemID = event.target.value;
      isAddItemDisable = false;
    }, 500);
  }

  function proceed() {
    goto('/new-order/proceed');
  }
</script>

<div class="flex flex-col gap-8 px-10 py-[60px]">
  <h3>New Order</h3>
  
  <div class="flex flex-col gap-2">
    <p>Item ID/Item Name</p>
    <div class="flex gap-x-5">
      <input class="w-[90%]" placeholder="Input Item ID/Item Name" type="text" bind:value={itemInput} on:input={handleItemIDInput} />
      <button id='add-item' class="bg-black text-white px-4 rounded-lg disabled:bg-slate-600 hover:bg-slate-900 w-[10%]" on:click={addItem} disabled={isAddItemDisable}>Add Item</button>
    </div>
  </div>
  
  <div class="gap-y-4 py-4 px-4 bg-white rounded-md">
    <table class="w-full">
      <thead class="border-b-2 border-black">
        <tr>
          <th class="py-2 text-left">Name</th>
          <th class="py-2">Price</th>
          <th class="py-2">Quantity</th>
          <th class="py-2">Sub-Total</th>
          <th class="py-2 text-right">Delete</th>
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
          {#each orders as order, idx}
            <tr>
              <td class="py-2 text-left">{order.name}</td>
              <td class="py-2">{order.price}</td>
              <td class="py-2">{order.quantity}</td>
              <td class="py-2">{currency} {order.price.split(' ')[1] * order.quantity}</td>
              <td class="py-2 text-right">
                <button aria-label={idx} class="underline text-red-600" on:click={deleteItem}>Delete</button>
              </td>
            </tr>
          {/each}
        {/if}
      </tbody>
    </table>
  </div>
  
  <div class="flex items-center gap-x-8">
    <div class="w-[100%]">
      <div class="flex w-full justify-between">
        <p>Total Quantity</p>
        <p>{totalQuantity}</p>
      </div>
      <div class="flex w-full justify-between">
        <p>Total Price</p>
        <p>{currency} {totalPrice}</p>
      </div>
    </div>
  
    <div >
      <button on:click={proceed} disabled={orders.length === 0} href='/new-order/proceed' class="px-8 py-3 rounded-md bg-green-700 text-white hover:bg-green-800 disabled:bg-green-600">Proceed</button>
    </div>
  </div>
</div>