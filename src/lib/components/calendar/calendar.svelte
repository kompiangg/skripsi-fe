<script lang="ts">
  import CalendarIcon from "svelte-radix/Calendar.svelte";
  import {
    type DateValue,
    DateFormatter,
    getLocalTimeZone,
    CalendarDate
  } from "@internationalized/date";
  import { cn } from "$lib/utils";
  import { Button } from "$lib/components/ui/button";
  import { Calendar } from "$lib/components/ui/calendar";
  import * as Popover from "$lib/components/ui/popover";
	import { env } from "$env/dynamic/public";
	import TimePicker from "./time-picker.svelte";

  const df = new DateFormatter("en-US", {
    dateStyle: "long"
  });

  export let value: DateValue | undefined = undefined;
  export let timeValue: {
    hour: number;
    minute: number;
  } = { hour: 0, minute: 0};
  let maxValue: DateValue = new CalendarDate(Number(env.PUBLIC_CUSTOM_CURRENT_YEAR), Number(env.PUBLIC_CUSTOM_CURRENT_MONTH), Number(env.PUBLIC_CUSTOM_CURRENT_DAY))
</script>

<Popover.Root>
  <Popover.Trigger asChild let:builder>
    <Button
      variant="outline"
      class={cn(
        "h-[46px] w-[260px] justify-start text-left font-normal",
        !value && "text-muted-foreground"
      )}
      builders={[builder]}
    >
      <CalendarIcon class="mr-2 h-4 w-4" />
      {value ? `${df.format(value.toDate(getLocalTimeZone())) + ' ' + timeValue.hour + ':' + timeValue.minute}` : "Pick a date"}
    </Button>
  </Popover.Trigger>
  <Popover.Content class="w-auto p-0" align="start">
    <Calendar bind:value {maxValue} />

    <hr class="mt-4">
    <div class="gap-x-4 px-3 py-4">
      <p class="text-[14px]">Payment time</p>
      <TimePicker 
        bind:hourValue={timeValue.hour}
        bind:minuteValue={timeValue.minute}
      />
      
    </div>
  </Popover.Content>
</Popover.Root>