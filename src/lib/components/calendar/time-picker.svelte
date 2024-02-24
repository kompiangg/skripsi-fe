<script>
// @ts-nocheck

  export let hourValue;
  export let minuteValue;

  let hourViewValue = `${hourValue}`.padStart(2, "0");
  let minuteViewValue = `${minuteValue}`.padStart(2, "0");

  function updateValue(event) {
    const value = Number(event.target.value);
    if (event.target.ariaLabel === "hour" && value > 23) {
      hourViewValue = `${hourValue}`.padStart(2, "0");
      return;
    } else if (event.target.ariaLabel === "minute" && value > 59) {
      minuteViewValue = `${minuteValue}`.padStart(2, "0");
      return;
    }

    if (event.target.value.length < 2) {
      event.target.value = `${event.target.value}`.padStart(2, "0");
    } else if (event.target.value[0] == 0) {
      event.target.value = event.target.value.slice(1);
    }

    if (event.target.ariaLabel === "hour") {
      hourValue = Number(event.target.value);
    } else {
      minuteValue = Number(event.target.value);
    }
  }
</script>

<div class="flex items-center gap-x-2">
  <input class="text-[14px] m-0 p-2 w-16" type="number" max="23" min="0" placeholder="00" aria-label="hour" on:input={updateValue} bind:value={hourViewValue}>
  <p class="text-[14px] font-bold">:</p>
  <input class="text-[14px] m-0 p-2 w-16" type="number" max="59" min="0" placeholder="00" aria-label="minute" on:input={updateValue} bind:value={minuteViewValue}>
</div>