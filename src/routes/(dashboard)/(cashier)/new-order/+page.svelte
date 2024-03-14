<script>
  // @ts-nocheck
	import { goto } from "$app/navigation";
  import { ordersStore } from "@/stores/orders";
  import { getItemByLikeNameOrID } from "@/service/generalService";
  import Select from 'svelte-select';

  let orders = $ordersStore;
  let totalQuantity = 0;
  let totalPrice = 0;
  let currency = 'BDT';
  let isAddItemDisable = true;
  let item = null;

  $: totalQuantity = orders.reduce((acc, item) => acc + Number(item.quantity), 0);
  $: totalPrice = orders.reduce((acc, item) => acc + Number(item.price) * Number(item.quantity), 0);
  $: {
    if (item) {
      isAddItemDisable = false;
    }
  }

  function addItem() {
    orders = [
      ...orders,
      {
        id : item.id,
        name: item.name,
        currency: currency,
        price: item.price,
        quantity: 1
      }
    ];

    ordersStore.set(orders);

    item = null;
    isAddItemDisable = true;
  }

  function deleteItem(event) {
    const idx = event.target.getAttribute('aria-label');
    deleteItemByIndex(idx)
  }

  function deleteItemByIndex(idx) {
    orders = orders.filter((_, i) => i != idx);
    ordersStore.set(orders);
  }

  async function loadOptions(filterText) {
    const items = await getItemByLikeNameOrID(filterText);

    if (!orders.length) {
      return items;
    }

    return items.filter(i => !orders.find(o => o.id === i.id));
  }

  function proceed() {
    goto('/new-order/proceed');
  }
</script>

<svelte:head>
  <title>Create New Order</title>
</svelte:head>

<div class="flex flex-col gap-8 px-10 py-[60px]">
  <h3>New Order</h3>
  
  <div class="flex flex-col gap-2">
    <p>Item ID/Item Name</p>
    <div class="flex gap-x-5">
      <div class="bg-white w-full h-full  rounded-lg">
        <Select class="w-[90%] text-black" {loadOptions} itemId="id" placeholder="Input Item ID/Item Name" bind:value={item}>
          <div slot="item" let:item let:index>
            <div class="flex items-center gap-x-2">
              <p>{item.id} - {item.name}</p>
            </div>
          </div>

          <div slot="selection" let:selection>
            <div class="flex items-center gap-x-2">
              <p>{selection.id} - {selection.name}</p>
            </div>
          </div>
        </Select>
      </div>
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
              <td class="py-2 flex items-center justify-center gap-x-3">
                <div  class="flex items-center">
                  <button aria-label={idx} on:click={() => {order.quantity <= 1 ? deleteItemByIndex(idx) : order.quantity--}}>-</button>
                </div>
                {order.quantity}
                <div class="flex items-center">
                  <button aria-label={idx} class="pb-[1px]" on:click={() => {order.quantity++}}>+</button>
                </div>
              </td>
              <td class="py-2">{currency} {order.price * order.quantity}</td>
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