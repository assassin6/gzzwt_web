<template lang="pug">
  .block-table
    .table-row(v-for="(row,rowIndex) in data" :key="rowIndex")
      .table-item(v-for="(item,index) in row" :key="index") 
         block(:type="item")
</template>

<script>
import Block from "./block";
export default {
  name: "blocktable",
  components: { Block },
  data() {
    return {
      data: [
        ["", "1号场", "2号场", "3号场", "4号场", "5号场"],
        ["08:00", "danger", "danger", "danger", "danger", "danger"],
        ["09:00", "danger", "empty", "danger", "danger", "danger"],
        ["10:00", "danger", "empty", "check", "empty", "danger"],
        ["11:00", "danger", "empty", "danger", "empty", "danger"],
        ["12:00", "danger", "empty", "danger", "empty", "danger"]
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.table-row {
  display: flex;
  .table-item {
    flex: 1;
    height: 30px;
    padding: 5px 2px;
  }
}
</style>