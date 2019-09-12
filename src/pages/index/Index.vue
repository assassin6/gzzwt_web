<template lang="pug">
    .index-wrapper
        app-link(:to="{name:''}")
            span 民政业务
        app-link(:to="{name:''}")
            span 公积金业务
        app-link(:to="{name:''}")
            span 医院业务
        app-link(:to="{name:''}")
            span 学校业务
        app-link(:to="{name:''}")
            span 社保业务
        app-link(:to="{name:''}")
            span 社会综合业务
        app-link(:to="{name:''}")
            span 交通业务
        app-link(:to="{name:''}")
            span 用户体系业务
        app-link(:to="{name:''}")
            span 机动车业务

</template>

<script>
import { pxtorem, imgPrefix } from "utils/filter";

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
    .index-wrapper{
        height: 100vh;
        @include flexColum(center,center);
        span{
            padding: 10px;
        }
    }

</style>
