<script>
	import { RangeCalendar as RangeCalendarPrimitive } from "bits-ui";
	import { cn } from "$lib/utils";
	export let date;
	let className = undefined;
	export { className as class };
</script>

<RangeCalendarPrimitive.Cell
	{date}
	class={cn(
		"text-center text-sm p-0 relative [&:has([data-selected][data-selection-start])]:rounded-l-md [&:has([data-selected][data-selection-end])]:rounded-r-md [&:has([data-selected][data-outside-month])]:bg-accent/50 [&:has([data-selected])]:bg-accent first:[&:has([data-selected])]:rounded-l-md last:[&:has([data-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
		className
	)}
	{...$$restProps}
>
	<slot />
</RangeCalendarPrimitive.Cell>
