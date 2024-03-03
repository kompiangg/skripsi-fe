<script lang="ts">
  export let title: string;
  export let value: Number;
</script>

<div class="flex flex-col gap-y-3 min-h-[102px] bg-white w-full rounded-lg px-7 py-8 justify-between">
  <subtle class="font-semibold">{title}</subtle>
  <div class="h-full pt-10">
    <h4 class="font-bold text-center text-3xl">{value}</h4>
  </div>
</div>