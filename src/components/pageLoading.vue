<template lang="pug">
  .page-loading(v-show="show" @touchstart="touchstart")
    img(src="../assets/images/loading.gif")
</template>

<script>
import { pxtorem } from "utils/filter";
export default {
  name: "pageLoading",
  model: {
    prop: "show"
  },
  props: {
    show: Boolean
  },
  filters: {
    pxtorem
  },
  methods: {
    touchstart(e) {
      e.preventDefault();
    }
  }
};
</script>
<style lang="scss" scoped>
.page-loading {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f1eb;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 99;
  img {
    width: 44px;
  }
}
</style>
