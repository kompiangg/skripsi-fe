<script lang="ts">
  export let title: string;
  export let value: Number;
  export let isUp: boolean;
  export let percentage: Number;

  const upDownColor = isUp ? "text-green-500" : "text-red-500";
</script>

<div class="flex flex-col gap-y-3 min-h-[102px] bg-white w-full rounded-lg px-5 py-[17px]">
  <subtle class="font-semibold">{title}</subtle>
  <h4 class="font-bold text-center text-3xl">{value}</h4>
  <p class="text-right align-top {upDownColor}">{isUp ? "Up":"Down"} {percentage}%</p>
</div>