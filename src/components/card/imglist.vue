<template lang="pug">
    ul.list
      template(v-for="(item,index) in data")
        li.list-item(:key="index")
          .list-img
            van-image(width="100" height="100" fit="cover" :src="item.img")
          .list-body
            .list-body__title {{item.title}}
            .list-body__label {{item.label}}
            .list-body__tag(v-if="isTagRender(item.tag)") 
              template(v-for="(child,key) in item.tag")
                van-tag(type="primary" :key="key") {{child}}
            .list-body__label(v-else) {{item.tag}}    
            .list-body__footer {{item.footer}}
          .list-label
            span {{item.extra}}
          
</template>
<script>
import Vue from "vue";
import { Image, Tag } from "vant";
import { isArray } from "lodash";
Vue.use(Image).use(Tag);
export default {
  name: "imglist",
  props: {
    data: {
      type: Array
    }
  },
  methods: {
    isTagRender(arr) {
      return isArray(arr);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/mixin";
.list {
  background-color: #ffffff;
  .list-item {
    display: flex;
    height: 120px;
    border: 1px solid $borderColor;
    box-sizing: content-box;
    .list-img {
      padding: 10px;
      border-radius: 2px;
    }
    .list-body {
      flex: 1;
      padding: 10px 0;
      .list-body__title {
        @include font(16, $titleColor);
        margin-bottom: 9px;
      }
      .list-body__label {
        color: $contentColor;
        margin-bottom: 9px;
      }
      .list-body__tag {
        margin-bottom: 9px;
      }
    }
    .list-label {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px;
    }
  }
}
</style>