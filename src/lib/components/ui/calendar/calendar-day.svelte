<script>
	import { Calendar as CalendarPrimitive } from "bits-ui";
	import { buttonVariants } from "$lib/components/ui/button";
	import { cn } from "$lib/utils";
	export let date;
	export let month;
	let className = undefined;
	export { className as class };
</script>

<CalendarPrimitive.Day
	on:click
	{date}
	{month}
	class={cn(
		buttonVariants({ variant: "ghost" }),
		"h-8 w-8 p-0 font-normal",
		// Today
		"[&[data-today]:not([data-selected])]:bg-accent [&[data-today]:not([data-selected])]:text-accent-foreground",
		// Selected
		"data-[selected]:bg-primary data-[selected]:text-primary-foreground data-[selected]:hover:bg-primary data-[selected]:hover:text-primary-foreground data-[selected]:focus:bg-primary data-[selected]:focus:text-primary-foreground data-[selected]:opacity-100",
		// Disabled
		"data-[disabled]:text-muted-foreground data-[disabled]:opacity-50",
		// Unavailable
		"data-[unavailable]:line-through data-[unavailable]:text-destructive-foreground",
		// Outside months
		"data-[outside-month]:text-muted-foreground data-[outside-month]:opacity-50 [&[data-outside-month][data-selected]]:bg-accent/50 [&[data-outside-month][data-selected]]:text-muted-foreground [&[data-outside-month][data-selected]]:opacity-30 data-[outside-month]:pointer-events-none",
		className
	)}
	{...$$restProps}
	let:selected
	let:disabled
	let:unavailable
	let:builder
>
	<slot {selected} {disabled} {unavailable} {builder}>
		{date.day}
	</slot>
</CalendarPrimitive.Day>
