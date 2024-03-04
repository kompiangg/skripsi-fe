<script>
  // @ts-nocheck
  
  import { DashboardCard } from '$lib/components/card';
	import { getDashboard } from '$lib/service/servingService';
  import { Chart } from 'chart.js/auto';
	import dayjs from 'dayjs';
	import { onMount } from 'svelte';
  import * as Select from "$lib/components/ui/select";
	import numeral from 'numeral';

  export let data;

  let totalItemSoldLinearChart;
  let totalItemSoldLineChartCanvas;
  let totalItemSoldLineChartCanvasCtx;

  let totalItemSoldPriceLinearChart;
  let totalItemSoldPriceLineChartCanvas;
  let totalItemSoldPriceLineChartCanvasCtx;

  let doughnutChart;
  let doughnutChartCanvas;
  let doughnutChartCanvasCtx;

  let dashboardData;

  // let doughnutData = [{
  //   label: 'Red',
  //   value: 300,
  //   color: 'rgb(255, 99, 132)'
  // }, {
  //   label: 'Blue',
  //   value: 50,
  //   color: 'rgb(54, 162, 235)'
  // }, {
  //   label: 'Yellow',
  //   value: 100,
  //   color: 'rgb(255, 205, 86)'
  // }, {
  //   label: 'Other',
  //   value: 150,
  //   color: 'rgb(211,211,211)'
  // }];

  let linearChartData = [
    {
      label: "Total Item Sold",
      data: [],
      fill: false,
      tension: 0.1
    },
    {
      label: "Total Order Price in USD",
      data: [],
      fill: false,
      tension: 0.1,
      borderColor: 'rgb(75, 192, 192)'
    }
  ]
  let doughnutChartData = [
    {
      label: "datasets",
      data: [],
      backgroundColor: [],
      hoverOffset: 4
    }
  ];

  let doughnutData = [];
  let doughnutLabels = [];

  let linearChartLabel = []; 
  let promise;

  const insightNumber = {
    totalOrder: '0',
    totalIncome: 'USD 0',
    orderFromMember: '0',
    orderFromNotMember:'0'
  }

  let qParam = '1w'

  promise = new Promise((resolve, reject) => {
    onMount(async () => {
      try {
        totalItemSoldLineChartCanvasCtx = totalItemSoldLineChartCanvas.getContext('2d');
        totalItemSoldPriceLineChartCanvasCtx = totalItemSoldPriceLineChartCanvas.getContext('2d');
        doughnutChartCanvasCtx = doughnutChartCanvas.getContext('2d');

        totalItemSoldLinearChart = new Chart(totalItemSoldLineChartCanvasCtx, {
          type: 'line',
          data: {
            labels: linearChartLabel,
            datasets: [linearChartData[0]]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              },
            },
            interaction: {
              mode: 'index',
              intersect: false,
            },
          },
        });

        totalItemSoldPriceLinearChart = new Chart(totalItemSoldPriceLineChartCanvasCtx, {
          type: 'line',
          data: {
            labels: linearChartLabel,
            datasets: [linearChartData[1]]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              },
            },
            interaction: {
              mode: 'index',
              intersect: false,
            },
          },
        });

        doughnutChart = new Chart(doughnutChartCanvasCtx, {
          type: 'doughnut',
          labels: doughnutLabels,
          data: {
            datasets: doughnutChartData,
          }
        });

        await refreshData();

        resolve();
      } catch (error) {
        reject(error)
      }
    })
  })

  async function refreshData() {
    try {
      dashboardData = await getDashboard(qParam, dayjs().utcOffset()/60, data.accessToken);

      insightNumber.totalOrder = numeral(dashboardData.totalOrder).format('0,0');
      insightNumber.totalIncome = `USD ${numeral(dashboardData.totalIncome).format('0,0.00')}`;
      insightNumber.orderFromMember = `${dashboardData.orderFromMember}/${dashboardData.orderFromMember + dashboardData.orderFromNotMember}`;
      insightNumber.orderFromNotMember = `${dashboardData.orderFromNotMember}/${dashboardData.orderFromMember + dashboardData.orderFromNotMember}`;

      linearChartLabel = dashboardData.linearChart.map(data => dayjs(data.date).format('DD MMM'));

      linearChartData[0].data = [];
      linearChartData[0].data.push(...dashboardData.linearChart.map(data => Number(data.total_order_quantity)));
      totalItemSoldLinearChart.data.labels = linearChartLabel;
      
      linearChartData[1].data = [];
      linearChartData[1].data.push(...dashboardData.linearChart.map(data => Number(data.total_order_price)));
      totalItemSoldPriceLinearChart.data.labels = linearChartLabel;

      doughnutChartData[0].data = [];
      doughnutChartData[0].data.push(...dashboardData.doughnutChart.map(data => data.quantity));

      doughnutChartData[0].backgroundColor = [];
      doughnutChartData[0].backgroundColor.push(...dashboardData.doughnutChart.map(data => data.color));

      doughnutLabels = []
      doughnutLabels = [...dashboardData.doughnutChart.map(data => data.itemName)]

      doughnutData = dashboardData.doughnutChart.map(data => {
        return {
          itemName: data.itemName,
          itemID: data.itemID,
          quantity: data.quantity,
          percentage: data.percentage,
          color: data.color
        }
      });

      totalItemSoldLinearChart.update();
      totalItemSoldPriceLinearChart.update();
      doughnutChart.update();

      return dashboardData;
    } catch (error) {
      console.log(error);
    }
  }
</script>

<svelte:head>
  <title>Dashboard</title>
</svelte:head>

<div class="py-10 px-10 flex flex-col gap-y-8">
  <div class="flex justify-between">
    <div>
      <h2>Hi, Admin!</h2>
      <p>Let's check your store today!</p>
    </div>

    <div>
      <Select.Root onSelectedChange={(v)=>{
        qParam = v.value;
        refreshData();
      }}>
        <Select.Trigger class="w-[180px]">
          <Select.Value placeholder="1 Week"/>
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="1w" >1 Week</Select.Item>
          <Select.Item value="1m">1 Month</Select.Item>
          <Select.Item value="3m">3 Month</Select.Item>
        </Select.Content>
      </Select.Root>      
    </div>
  </div>

  <div>
    <h3>The Numbers</h3>

    <div class="mt-7">
      <div class="flex justify-between h-[530px] px-8">
        <div class="flex flex-col w-[40%] gap-y-5 px-6 py-6 bg-white rounded-lg justify-center">
          <div class="text-center">
            <h4 class="font-bold">Top Seller Products</h4>
          </div>
          <div class="flex justify-center h-[60%]">
            <canvas bind:this={doughnutChartCanvas} />
          </div>
    
          <div class="flex flex-col gap-y-1 pl-4">
            {#each doughnutData as data}
              <div class="flex items-center gap-x-4">
                <div class="w-4 h-4 rounded-full" style="background-color:{data.color}"></div>
                <list>
                  {data.itemName}
                </list>
              </div>
            {/each}
          </div>
        </div>
    
        <div class="w-[50%] flex flex-col justify-center gap-y-12">
          <div class="flex gap-x-12 h-full center">
            <DashboardCard title="Total Order" bind:value={insightNumber.totalOrder}/>
            <DashboardCard title="Total Income" bind:value={insightNumber.totalIncome}/>
          </div>
          <div class="flex gap-x-12 h-full center">
            <DashboardCard title="Order from Member" bind:value={insightNumber.orderFromMember}/>
            <DashboardCard title="Order from Not Member" bind:value={insightNumber.orderFromNotMember}/>
          </div>
        </div>
      </div>
    </div>
  </div>

  <h3 class="mt-7">The Charts</h3>
  <canvas height="400px" bind:this={totalItemSoldPriceLineChartCanvas} />
  <canvas height="300px" bind:this={totalItemSoldLineChartCanvas} />
</div>