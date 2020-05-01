<template>
  <div id="app">
    <v-app-bar app color="indigo" dark>
      <v-toolbar-title>Example Client</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <v-container>
        <v-row justify="center">
          <v-col cols="10">
            <summary-chart :mst-machine="mstMachine" :product-log="productLog"></summary-chart>
          </v-col>
          <v-col cols="10">
            <all-data-table :product-log="productLog"></all-data-table>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </div>
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
