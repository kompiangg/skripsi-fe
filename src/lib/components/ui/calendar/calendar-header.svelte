<script>
	import { Calendar as CalendarPrimitive } from "bits-ui";
	import { cn } from "$lib/utils";
	let className = undefined;
	export { className as class };
</script>

<CalendarPrimitive.Header
	class={cn("flex justify-between pt-1 relative items-center w-full", className)}
	{...$$restProps}
>
	<slot />
</CalendarPrimitive.Header>
