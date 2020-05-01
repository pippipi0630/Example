<template>
  <v-data-table
  :headers="headers"
  :items="productLog"
  :items-per-page="10"
  class="elevation-1"></v-data-table>
</template>

<script>
export default {
  props: ["productLog"],
  data() {
    return {
      headers: [
        { text: "装置ID", value: "machineId" },
        { text: "品種ID", value: "orderId" },
        { text: "生産数", value: "quantity" },
      ]
    };
  }
};
</script>