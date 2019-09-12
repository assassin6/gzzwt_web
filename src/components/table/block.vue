<template lang="pug">
  .block-container
    .block.block-danger(v-if="type==='danger'")
    .block.block-check(v-else-if="type==='check'")
      van-icon(name="success" size="20" color="#fff")
    .block.block-empty(v-else-if="type==='empty'")
    span(v-else) {{type}}
</template>

<script>
import Vue from "vue";
import { Icon } from "vant";
Vue.use(Icon);
export default {
  name: "block",
  props: {
    type: {
      type: String
    }
  }
};
</script>

<style lang="scss" scoped>
.block-container {
  .block {
    width: 100%;
    max-width: 40px;
    height: 20px;
    border-radius: 2px;
  }
  .block-danger {
    background: #ff6968;
  }
  .block-empty {
    border: 1px solid #cccccc;
  }
  .block-check {
    text-align: center;
    background-color: #07c160;
  }
}
</style>