<template>
  <v-app>
    <v-app-bar app color="indigo" dark>
      <v-toolbar-title>Example Client</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <v-container>
        <v-row justify="center">
          <v-col cols="6">
            <!-- ここは ただのスペーサ -->
          </v-col>
          <v-col cols="2">
            <v-btn @click="FetchData">クリックでデータ再取得</v-btn>
          </v-col>
          <v-col cols="8">
            <v-card>
              <v-card-title>装置ごと生産数</v-card-title>
              <summary-chart
                :mst-machine="mstMachine"
                :mst-order="mstOrder"
                :product-log="productLog"
              ></summary-chart>
            </v-card>
          </v-col>
          <v-col cols="8">
            <v-card>
              <v-card-title>取得データ一覧</v-card-title>
              <all-data-table :product-log="productLog"></all-data-table>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";
import SummaryChart from "./components/SummaryChart";
import AllDataTable from "./components/AllDataTable";

// ホストのURL
// const serviceAddr = location.href;

// デバッグ用（ホストとAPI受付port番号が異なるため）
const serviceAddr = "http://localhost:3000";

export default {
  name: "App",
  components: {
    SummaryChart,
    AllDataTable
  },
  data() {
    return {
      mstMachine: [],
      mstOrder: [],
      productLog: []
    };
  },
  methods: {
    FetchMaster() {
      axios.get(serviceAddr + "/master/machine").then(res => {
        this.mstMachine = res.data;
      });
      axios.get(serviceAddr + "/master/order").then(res => {
        this.mstOrder = res.data;
      });
    },
    FetchData() {
      axios.get(serviceAddr + "/data").then(res => {
        this.productLog = res.data;
      });
    }
  },
  mounted() {
    this.FetchMaster();
    this.FetchData();
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
