<template lang="pug">
    .app-header(:style="{'padding-top': isIpx ? '44px' : '20px'}")
        p.icon-arrow-left(@click="back")
        p.title.ellipsis {{title}}
        .handle
            slot
</template>

<script>
import { isIpx } from "utils/isTerminal";

export default {
  name: "appLink",
  props: {
    title: {
      type: String
    }
  },
  data() {
    return {
      isIpx: isIpx
    };
  },
  methods: {
    back() {
      console.log("back");
      if (window.rn) {
        rn.app.goBack();
      } else {
        console.log("back");
        window.history.back(-1);
      }
    }
  }
};
</script>
<style lang="scss">
.app-header {
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  /*color: #fff;*/
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .icon-arrow-left {
    font-size: 20px;
    color: #101010;
    font-weight: bold;
    flex: 1;
  }
  .title {
    font-size: 18px;
    color: #101010;
    font-weight: bold;
    line-height: 52px;
    width: 200px;
    text-align: center;
    flex: 3;
  }
  .handle {
    width: 100px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    flex: 1;
  }
}
</style>
