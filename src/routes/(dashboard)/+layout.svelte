<script>
// @ts-nocheck

	import {SidebarMenu} from '$lib/components/sidebar';
	import LogOut from '@/components/icons/logout.svelte';

	export let data;

	/**
	 * @param {any} href
	 */
	function isActive(href) {
		return href == data.pathName;
	}
</script>

<div class="flex h-screen bg-gray-100">
	<div class="bg-slate-800 text-white w-80 px-5">
		<div class="space-y-6  pt-10 pb-8">
			<h2 class="text-">Welcome!</h2>
			
			{#if data.accountInfo.role === 'cashier'}
				<div class="px-5 py-4 bg-slate-600 rounded-md">
					<h3>{data.accountInfo.name}</h3>
					<detail>{data.accountInfo.id}</detail>
					<p>Kasir</p>
				</div>
			{/if}
		</div>
		
		<hr>

		<div class="py-5">
			{#if data.accountInfo.role === 'admin'}
				<SidebarMenu href='/dashboard' text="Dashboard" isActive={(href) => isActive(href)}/>
			{/if}
			
			{#if data.accountInfo.role === 'cashier'}
				<SidebarMenu href='/new-order' text="Create New Order" isActive={(href) => isActive(href)}/>
			{/if}

			<SidebarMenu href='/order-list' text="Order List" isActive={(href) => isActive(href)}/>
		</div>
		
		<hr>

		<form method="POST" action="/login?/logout">
			<button type='submit' class="w-full">
				<div class="py-8">
					<div class="flex px-5 py-3 items-center space-x-3 bg-red-600 rounded-md cursor-pointer hover:bg-red-700">
						<LogOut/>
						<p class="font-bold text-base">Log Out</p>
					</div>
				</div>
			</button>
		</form>
	</div>

	<div>
		<slot />
	</div>
</div>

