<template lang="pug">
.app-scroller(ref="scroller")
  van-pull-refresh(
    v-model="scrollRefresh"
    :head-height="headerHeight"
    @refresh="refresh"
    :disabled="disabledRefesh"
    pulling-text="下拉刷新"
    loosing-text="释放更新"

  )
    .empty(v-if="isEmpty")
      img(src="../assets/images/empty.png")
      p 空空如也 
    van-list(
      v-if="!isEmpty"
      v-model="scrollLoading"
      :finished="finished"
      :finished-text="finishedText"
      :immediate-check="immediateCheck"
      @load="load"
    )
      slot(name="listItem" v-for="item, index in list" :item="item" :index="index")
</template>

<script>
import { List, PullRefresh } from "vant";
export default {
  name: "scroll",
  props: {
    isEmpty: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: () => {
        return [];
      }
    },
    load: {
      type: Function,
      required: true
    },
    finished: {
      type: Boolean,
      default: false
    },
    finishedText: {
      type: String,
      default: "没有更多了"
    },
    immediateCheck: {
      type: Boolean,
      default: false
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    headerHeight: {
      type: Number,
      default: 80
    },
    offset: {
      type: Number,
      default: 300
    },
    refresh: {
      type: Function,
      default: () => {}
    },
    isRefresh: {
      type: Boolean,
      default: false
    },
    disabledRefesh: {
      type: Boolean,
      default: false
    },
    delay: {
      type: Number,
      default: 300
    }
  },
  data() {
    return {
      scrollRefresh: false,
      scrollLoading: false
    };
  },
  watch: {
    isRefresh(v) {
      setTimeout(() => {
        this.scrollRefresh = v;
      }, this.delay);
    },
    isLoading(v) {
      this.scrollLoading = v;
    },
    scrollRefresh(v) {
      this.$emit("update:isRefresh", v);
    },
    scrollLoading(v) {
      this.$emit("update:isLoading", v);
    }
  },
  created() {
    this.scrollRefresh = this.isRefresh;
    this.scrollLoading = this.isLoading;
  },
  mounted() {
    this.$refs.scroller.addEventListener("scroll", () => {
      const { scrollTop } = this.$refs.scroller;
      if (scrollTop < 1) this.$refs.scroller.scrollTop = 0;
    });
  },
  components: {
    vanList: List,
    vanPullRefresh: PullRefresh
  }
};
</script>

<style lang="scss">
.app-scroller {
  height: 100%;
  -webkit-overflow-scrolling: touch;
  overflow-y: auto;
  .van-list {
    min-height: 100vh;
  }
  .empty {
    text-align: center;
    img {
      width: 100px;
      margin: 170px auto 0;
    }
    p {
      color: #ccc;
      margin-top: 10px;
      font-size: 16px;
    }
  }
}
</style>