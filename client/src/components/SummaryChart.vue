<template>
  <div>
    <bar-chart :chart-data="datacollection" :options="options"></bar-chart>
  </div>
</template>

<script>
import BarChart from "./BarChart.js";

export default {
  props: ["mstMachine", "productLog"],
  components: {
    BarChart
  },
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display : false
        },
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: "生産数",
                fontSize: 12
              },
              ticks: {
                min: 0,
                stepSize: 10
              }
            }
          ]
        }
      },
      datacollection: {}
    };
  },
  watch: {
    productLog() {
      // 親コンポーネントからproductLogを変更されるたびに以下実行

      let labels = [];
      let data = [];

      // 装置マスタをid順にソート
      let mm = this.mstMachine.sort((a, b) => a.id - b.id);

      mm.forEach(machine => {
        let pl = this.productLog.filter(x => x.machineId === machine.id);
        if (pl.length > 0) {
          // 合計生産数を算出
          let total = pl.reduce((prev, curr) => prev + curr.quantity, 0);
          data.push(total);
        } else {
          data.push(0);
        }
        labels.push(machine.name);
      });

      this.datacollection = {
        labels,
        datasets: [{ data }]
      };
    }
  }
};
</script>