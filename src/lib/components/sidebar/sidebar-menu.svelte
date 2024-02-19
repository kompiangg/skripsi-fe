<script>
// @ts-nocheck

	export let href;
	export let text;
	export let isActive;
</script>

<div class="py-3">
	<a class={isActive(href) ? 'active' : ''} data-sveltekit-reload {href}>{text}</a>
</div>

<style>
	a {
		display: block;
		font-weight: 600;
		font-size: 1.5rem;
		line-height: 1.75rem;
		padding: 0.8rem 1.5rem;
		border-radius: calc(var(--radius) - 2px);
	}

	a:hover {
		--tw-bg-opacity: 1;
		background-color: rgb(71 85 105 / var(--tw-bg-opacity));
	}

	.active {
		--tw-bg-opacity: 1;
		background-color: rgb(71 85 105 / var(--tw-bg-opacity));
	}
</style>