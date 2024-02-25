<script lang="ts">
  import { Calendar as CalendarIcon } from "radix-icons-svelte";
  import type { DateRange } from "bits-ui";
  import {
    DateFormatter,
    getLocalTimeZone,
    type DateValue,
    CalendarDate,
  } from "@internationalized/date";
  import { cn } from "$lib/utils";
  import { Button } from "$lib/components/ui/button";
  import { RangeCalendar } from "$lib/components/ui/range-calendar";
  import * as Popover from "$lib/components/ui/popover";
  import TimePicker from "./time-picker.svelte";
	import { env } from "$env/dynamic/public";

  export let value: DateRange;
  export const startTimeValue = { hour: 0, minute: 0 };
  export const endTimeValue = { hour: 23, minute: 59 };

  const df = new DateFormatter("en-US", {
    dateStyle: "medium"
  });

  let maxValue: DateValue = new CalendarDate(Number(env.PUBLIC_CUSTOM_CURRENT_YEAR), Number(env.PUBLIC_CUSTOM_CURRENT_MONTH), Number(env.PUBLIC_CUSTOM_CURRENT_DAY));

  $: if (!value.end) {
    value.end = value.start;
  }
</script>

<div class="grid gap-2">
  <Popover.Root openFocus>
    <Popover.Trigger asChild let:builder>
      <Button
        variant="outline"
        class={cn(
          "w-[360px] justify-start text-left font-normal",
          !value && "text-muted-foreground"
        )}
        builders={[builder]}
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        {#if value && value.start}
          {#if value.end}
            {df.format(value.start.toDate(getLocalTimeZone()))} {`${startTimeValue.hour}`.padStart(2, '0')}:{`${startTimeValue.minute}`.padStart(2, '0')} - {df.format(
              value.end.toDate(getLocalTimeZone())
            )} {`${endTimeValue.hour}`.padStart(2, '0')}:{`${endTimeValue.minute}`.padStart(2, '0')}
          {:else}
            {df.format(value.start.toDate(getLocalTimeZone()))} 
          {/if}
        {:else}
          Pick a date
        {/if}
      </Button>
    </Popover.Trigger>
    <Popover.Content class="w-auto p-0" align="start">
      <RangeCalendar
        bind:value
        bind:startValue={value.start}
        placeholder={value?.start}
        initialFocus
        numberOfMonths={2}
        {maxValue}
      />
      <hr class="mt-4">
      <div class="flex gap-x-4 px-3 py-4">
        <div>
          <p class="text-[14px]">Start date time</p>
          <TimePicker 
            bind:hourValue={startTimeValue.hour}
            bind:minuteValue={startTimeValue.minute}
          />
        </div>
        <div>
          <p class="text-[14px]">End date time</p>
          <TimePicker
            bind:hourValue={endTimeValue.hour}
            bind:minuteValue={endTimeValue.minute}
          />
        </div>
      </div>
    </Popover.Content>
  </Popover.Root>
</div>