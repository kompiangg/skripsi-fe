<script>
  /**
	 * @type {any[]}
	 */
  const order = []
  let totalQuantity = 0;
  let totalPrice = 0;

  $: totalQuantity = order.reduce((acc, item) => acc + item.quantity, 0);
  $: totalPrice = order.reduce((acc, item) => acc + item.price, 0);
</script>

<p>Back</p>

<h1>Payment</h1>

<div>
  <div>
    <h2>Payment Method</h2>
    <input type="text" name="payment-method" id="payment-method">
  </div>

  <div>
    <h2>Member Information</h2>
    <input type="text" name="member-information" id="member-information">
  </div>
</div>

<div>
  <h2>Order Information</h2>
  <div>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Sub-Total</th>
        </tr>
      </thead>
      <tbody>
        {#each order as item}
          <tr>
            <td>{item.name}</td>
            <td>{item.price}</td>
            <td>{item.quantity}</td>
            <td>{item.price * item.quantity}</td>
          </tr>
        {/each}
    </table>
  </div>
</div>

<div>
  <div>
    <div>
      <p>Total Quantity</p>
      <p>{totalQuantity}</p>
    </div>
    <div>
      <p>Total Price</p>
      <p>AFN {totalPrice}</p>
    </div>
  </div>

  <div>
    <button>Proceed</button>
  </div>
</div>