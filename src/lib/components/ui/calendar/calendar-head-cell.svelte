<script>
	import { Calendar as CalendarPrimitive } from "bits-ui";
	import { cn } from "$lib/utils";
	let className = undefined;
	export { className as class };
</script>

<CalendarPrimitive.HeadCell
	class={cn("text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]", className)}
	{...$$restProps}
>
	<slot />
</CalendarPrimitive.HeadCell>
