<template lang="pug">
.one-px-t.handle-bar
	.back(@click="handleback")
		.icon-left(v-show="back")
	.tags
		.tag(v-if="handles.indexOf('view') > -1")
			i.tag-icon.icon-view
			span.tag-value {{views}}
		.tag(
			v-if="handles.indexOf('like') > -1"
			:class="{'tag-yello': isLike}"
			@click="like"
		)
			i.icon-like.tag-icon(v-if="isLike")
			i.icon-like-line.tag-icon(v-else)
			span.tag-value {{likes}}
		.tag(
			v-if="handles.indexOf('collect') > -1"
			:class="{'tag-yello': isCollect}"
			@click="collect"
		)
			i.icon-collect.tag-icon(v-if="isCollect")
			i.icon-collect-line.tag-icon(v-else)
			span.tag-value {{collects}}
		.tag(v-if="handles.indexOf('share') > -1" @click="share")
			i.tag-icon.icon-share
			span.tag-value
</template>

<script>
import { like, collect } from "api";
export default {
  name: "handleBar",
  props: {
    id: {
      type: [String, Number],
      required: true
    },
    type: {
      type: [String, Number],
      required: true
    },
    views: [String, Number],
    back: Boolean,
    isLike: Boolean,
    likes: [String, Number],
    isCollect: Boolean,
		collects: [String, Number],
		shareConfig: {
			type: Object,
			default: () => {
				return { title: '', url: window.location.href, content: '' }
			}
		},
    handles: {
      type: Array,
      default: ["view", "like", "collect", "share"]
    }
  },
  methods: {
    handleback() {
      rn.app.goBack();
    },
    share() {
      rn.app.share(
        { message: this.shareConfig.content, title: this.shareConfig.title, url: this.shareConfig.url },
        {},
        result => {
          console.log(result)
        }
      );
    },
    async like() {
      try {
        this.$emit("like");
        await like({ id: this.id, type: this.type });
      } catch ({ msg }) {
        this.$emit("like");
        this.$toast(msg);
      }
    },
    async collect() {
      try {
        this.$emit("collect");
        await collect({ id: this.id, type: this.type });
      } catch ({ msg }) {
        this.$emit("collect");
        this.$toast(msg);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.handle-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 44px;
  z-index: 999;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 17px;
}

.back {
  font-size: 20px;
}

.tags {
  display: flex;
  align-items: center;
}

.tag {
  margin-right: 20px;
  &:last-child {
    margin-right: 0;
  }
}

.tag-icon {
  font-size: 20px;
  margin-right: 5px;
}

.tag-value {
  font-size: 12px;
  vertical-align: top;
}

.tag-yello {
  .tag-icon {
    color: #ffcc00;
  }
}
</style>
