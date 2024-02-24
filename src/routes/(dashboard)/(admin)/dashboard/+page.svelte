<script>
  // @ts-nocheck
  
  import {DashboardCard} from '$lib/components/card';
  import { Chart } from 'chart.js/auto';
	import { onMount } from 'svelte';

  let lineChartCanvas;
  let lineChartCanvasCtx;

  let doughnutChartCanvas;
  let doughnutChartCanvasCtx;

  let doughnutData = [{
    label: 'Red',
    value: 300,
    color: 'rgb(255, 99, 132)'
  }, {
    label: 'Blue',
    value: 50,
    color: 'rgb(54, 162, 235)'
  }, {
    label: 'Yellow',
    value: 100,
    color: 'rgb(255, 205, 86)'
  }];

  onMount(() => {
    lineChartCanvasCtx = lineChartCanvas.getContext('2d');
    doughnutChartCanvasCtx = doughnutChartCanvas.getContext('2d');

    new Chart(lineChartCanvasCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
          {
            label: 'Total Order',
            data: [11, 12, 13, 14, 15, 16, 17],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          },
          {
            label: 'Total Order',
            data: [12, 19, 3, 5, 2, 3, 10],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          },
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    new Chart(doughnutChartCanvasCtx, {
      type: 'doughnut',
      data: {
        // labels: ['Red', 'Blue', 'Yellow'],
        datasets: [{
          label: 'My First Dataset',
          data: doughnutData.map(data => data.value),
          backgroundColor: doughnutData.map(data => data.color),
          hoverOffset: 4
        }]
      }
    });
  })

</script>

<div class="py-10 px-10 flex flex-col gap-y-8">
  <div>
    <h2>Hi, Admin!</h2>
    <p>Let's check your store today!</p>
  </div>
  
  <div class="flex justify-between h-[500px] px-8">
    <div class="min-w-[1000px]">
      <canvas bind:this={lineChartCanvas} />
    </div>

    <div class="flex flex-col gap-y-5 px-6 py-6 bg-white rounded-lg">
      <div>
        <h4>Top 3 Selling Products</h4>
      </div>
      <canvas bind:this={doughnutChartCanvas} />

      <div class="flex flex-col gap-y-1">
        {#each doughnutData as data}
          <div class="flex items-center gap-x-4">
            <div class="w-4 h-4 rounded-full" style="background-color:{data.color}"></div>
            <list>
              {data.label}
            </list>
          </div>
        {/each}
      </div>
    </div>
  </div>
    
  <div class="flex gap-x-12 mt-10">
    <DashboardCard title="Total Order" value={123} isUp={true} percentage={100}/>
    <DashboardCard title="Total Order" value={123} isUp={true} percentage={100}/>
    <DashboardCard title="Total Order" value={123} isUp={true} percentage={100}/>
    <DashboardCard title="Total Order" value={123} isUp={true} percentage={100}/>
  </div>
</div>