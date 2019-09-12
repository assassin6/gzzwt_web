<template lang="pug">
  ul.list
    template(v-for="(item,index) in data")
       li.list-item(:key="index")
         .list-title {{item.title}}
         .list-body
            .lbody-left
              template(v-for="(child,key) in item.children")
                .lbody-item(:key="key")
                  .lbody-item__label {{child.text}}:
                  .lbody-item__text {{child.value}}
            .lbody-right
              slot(v-bind:item="item" name="right")
</template>

<script>
export default {
  name: "infoList",
  props: {
    data: {
      type: Array
    }
  },
  data() {
    return {};
  },
  async created() {},
  mounted() {},
  methods: {},
  components: {}
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/mixin";
.list {
  padding-top: 2px;
  .list-item {
    padding: 15px;
    background: #ffffff;
    border-bottom: 1px solid $borderColor;
    .list-title {
      @include font(16, $titleColor);
    }
    .list-body {
      margin-top: 10px;
      display: flex;
      .lbody-left {
        flex: 1;
        .lbody-item {
          display: flex;
          margin-bottom: 5px;
          .lbody-item__label {
            color: $contentColor;
            padding-right: 10px;
          }
          .lbody-item__text {
            flex: 1;
          }
        }
      }
      .lbody-right {
        flex: none;
        text-align: right;
      }
    }
  }
}
</style>