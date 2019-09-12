<template lang="pug">
    .index-wrapper
        header.index-header.one-px-b
            .index-header-wrapper
                span.title 政务通
                app-link.wrapper-message(:to="{name:'messageList'}" )
                    span.icon-messages-set.img-message


</template>

<script>
import { pxtorem, imgPrefix } from "utils/filter";
import { isIpx } from "utils/isTerminal";
import { getSorce, login } from "../../api/";

export default {
  name: "index",
  filters: {
    pxtorem,
    imgPrefix
  },
  data() {
    return {};
  },
  async created() {
      await getSorce();
    //await login();
  },
  components: {}
};
</script>
<style lang="scss">
@import "../../assets/css/mixin";
@supports (-webkit-overflow-scrolling: touch) {
  .scroll-container {
    -webkit-transform: translate3d(0, 0, 0);
  }
}

.isIpx {
  background: $backgroundColor;
  padding-bottom: $warpperMargin;
  height: 100vh;
  padding-top: 92px;
  overflow: hidden;
}

.noIpx {
  background: $backgroundColor;
  height: 100vh;
  padding-top: 72px;
  overflow: hidden;
}

.index-header {
  background-color: white;
  position: fixed !important;
  left: 0;
  right: 0;
  top: 0;
  padding: 20px 15px 0;
  z-index: 999;

  .index-header-wrapper {
    @include wh(100%, 52);
    @include flexRow(space-between, center);
  }

  .title {
    @include font(18, $titleColor, bold);
  }

  .wrapper-message {
    position: relative;
    @include flexRow(center, center);

    .img-message {
      font-size: 20px;
    }
    .brige {
      position: absolute;
      color: red;
      top: -10px;
      right: 0px;
      font-size: 25px;
    }

    .label {
      @include font(15, $titleColor, bold);
      margin-top: 3px;
      margin-left: 2px;
    }
  }
}
</style>
