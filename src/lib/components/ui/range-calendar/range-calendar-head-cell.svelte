<script>
	import { RangeCalendar as RangeCalendarPrimitive } from "bits-ui";
	import { cn } from "$lib/utils";
	let className = undefined;
	export { className as class };
</script>

<RangeCalendarPrimitive.HeadCell
	class={cn("text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]", className)}
	{...$$restProps}
>
	<slot />
</RangeCalendarPrimitive.HeadCell>
