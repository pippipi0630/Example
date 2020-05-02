<template>
  <div>
    <bar-chart :chart-data="datacollection" :options="options"></bar-chart>
  </div>
</template>

<script>
import BarChart from "./BarChart.js";

export default {
  props: ["mstMachine", "mstOrder", "productLog"],
  components: {
    BarChart
  },
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            left: 10,
            right: 10,
            top: 0,
            bottom: 0
          }
        },
        scales: {
          xAxes: [{ stacked: true, ticks: { beginAtZero: true } }],
          yAxes: [
            {
              stacked: true,
              scaleLabel: {
                display: true,
                labelString: "生産数",
                fontSize: 12
              },
              ticks: {
                beginAtZero: true,
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
      let datasets = [];
      // グラフの色
      let colorPallet = [
        "#4169e1",
        "#191970",
        "#00ffff",
        "#008000",
        "#00ff7f",
        "#eee8aa",
        "#ffa500",
        "#8b0000",
        "#cd5c5c",
        "#ff69b4"
      ];

      // 装置マスタをid順にソート
      let mm = this.mstMachine.sort((a, b) => a.id - b.id);
      let mo = this.mstOrder.sort((a, b) => a.id - b.id);

      // ラベル作成
      mm.forEach(machine => {
        labels.push(machine.name);
      });

      // 装置ｘ部版ごとにデータセットを作成
      mo.forEach(order => {
        let data = [];
        mm.forEach(machine => {
          let pl = this.productLog.filter(
            x => x.machineId === machine.id && x.orderId === order.id
          );
          if (pl.length > 0) {
            // 合計生産数を算出
            let total = pl.reduce((prev, curr) => prev + curr.quantity, 0);
            data.push(total);
          } else {
            // フィルタ０件だとreduceに失敗するので別にする
            data.push(0);
          }
        });
        datasets.push({
          label: order.name,
          backgroundColor: colorPallet.shift(),
          data
        });
      });

      this.datacollection = {
        labels,
        datasets
      };
    }
  }
};
</script>