<template lang="pug">
   .amap-wrapper
     #container
</template>


<script>
import MapLoader from "../../../utils/Amap.js";
export default {
  data: function() {
    return {
      map: null
    };
  },

  methods: {
    getMap() {
      // amap vue component
      console.log(amapManager._componentMap);
      // gaode map instance
      console.log(amapManager._map);
    }
  },
  mounted() {
    let that = this;
    MapLoader().then(
      AMap => {
        console.log("地图加载成功");
        that.map = new AMap.Map("container", {
          center: [117.000923, 36.675807],
          zoom: 11
        });
      },
      e => {
        console.log("地图加载失败", e);
      }
    );
  }
};
</script>

<style lang="scss">
@import "../../../assets/css/mixin";
.amap-wrapper {
  width: 500px;
  height: 500px;
  #container {
    height: 300px;
    width: 100%;
  }
}
</style>