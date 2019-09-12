<template lang="pug">
    van-tree-select(:items="items" v-bind:active-id.sync="activeId" v-bind:main-active-index.sync="activeIndex" @click-item="clickItem")
</template>

<script>
import { openPage } from "@/utils/jsBrige";
import { getHospitalDepartments } from "@/api/hospital";
export default {
  name: "app",
  data() {
    return {
      activeIndex: 0, //items默认显示的对象的下标
      activeId: -1,
      items: []
    };
  },
  mounted() {
    getHospitalDepartments({ hospitalId: this.$query.hospitalId }).then(res => {
      res.data.map((item, index) => {
        let newItem = {
          text: item.name,
          id: index,
          children: []
        };
        item.subLabels.map((child, id) => {
          newItem.children.push({
            text: child.name,
            id,
            code: child.code
          });
        });
        this.items.push(newItem);
      });
    });
  },
  created() {},
  methods: {
    clickItem(data) {
      openPage({
        name: `/hospital/appointment/doctorList.html?id=${this.$query.hospitalId}&typeCode=${data.code}`
      });
    }
  },
  components: {}
};
</script>
<style lang="scss">
</style>
