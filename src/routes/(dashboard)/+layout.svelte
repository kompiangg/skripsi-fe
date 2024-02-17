<script>
	export let data;
</script>

<h1>Welcome!</h1>

{#if data.accountInfo.role === 'cashier'}
	<h2>{data.accountInfo.name}</h2>
	<p>{data.accountInfo.id}</p>
	<p>Kasir</p>
{/if}

<hr>

{#if data.accountInfo.role === 'admin'}
	<a data-sveltekit-reload href="/dashboard">Dashboard</a>
{/if}

{#if data.accountInfo.role === 'cashier'}
	<a data-sveltekit-reload href="/new-order">Create New Order</a>
{/if}

<a data-sveltekit-reload href="/order-list">Order List</a>

<hr>

<form method="POST" action="/login?/logout">
	<button type='submit'>Log Out</button>
</form>

<slot />