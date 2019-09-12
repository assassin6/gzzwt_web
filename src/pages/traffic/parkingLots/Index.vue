<template lang="pug">
  #root
    .seachParkingLots
      .inputContainer
        input(placeholder="请输入停车地点" v-model="seachCondition")
        span(@click="seachParkingLots()") 搜索
    #container
    .resultNums(v-if="parkingLotsNum > 0") 共找到{{parkingLotsNum}}个停车场
    #panel

</template>


<script>
import MapLoader from "../../../utils/Amap.js";
export default {
  data: function() {
    return {
      map: null,
      AMap: null,
      seachCondition: "",
      cityCode: "", //当前定位城市,
      markerList: [],
      location: [], //当前定位的经纬度
      parkingLotsNum: ""
    };
  },

  methods: {
    seachParkingLots() {
      //搜索停车场
      // this.AMap.plugin("AMap.Autocomplete", () => {
      //   // 实例化Autocomplete
      //   var autoOptions = {
      //     //city 限定城市，默认全国
      //     city: this.cityCode || "广州市"
      //   };
      //   if (this.markerList.length) {
      //     for (let i of this.markerList) {
      //       this.map.remove(i);
      //     }
      //   }
      //   var autoComplete = new AMap.Autocomplete(autoOptions);
      //   autoComplete.search(this.seachCondition, (status, result) => {
      //     console.log(result.tips);
      //     for (let i of result.tips) {
      //       if (i.location) {
      //         let marker = new this.AMap.Marker({
      //           position: new this.AMap.LngLat(i.location.lng, i.location.lat)
      //         });
      //         this.map.add(marker);
      //         this.markerList.push(marker);
      //       }
      //     }
      //   });
      // });
      AMap.service(["AMap.PlaceSearch"], () => {
        //构造地点查询类
        var placeSearch = new AMap.PlaceSearch({
          type: "停车场", // 兴趣点类别
          city: this.cityCode, // 兴趣点城市
          pageSize: 10, // 单页显示结果条数
          pageIndex: 1, // 页码
          citylimit: true, //是否强制限制在设置的城市内搜索
          panel: "panel", // 结果列表将在此容器中进行展示。
          map: this.map, // 展现结果的地图实例
          autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        });
        var cpoint = this.location; //中心点坐标
        placeSearch.searchNearBy(
          this.seachCondition,
          cpoint,
          2000,
          (status, result) => {
            this.parkingLotsNum = result.poiList.count;
            console.log(status, result);
          }
        );
      });
    }
  },
  mounted() {
    let that = this;
    MapLoader().then(
      AMap => {
        //console.log("地图加载成功");
        this.AMap = AMap;
        that.map = new AMap.Map("container", {
          zoom: 12,
          resizeEnable: true
        });
        AMap.plugin("AMap.Geolocation", function() {
          var geolocation = new AMap.Geolocation({
            enableHighAccuracy: true, //是否使用高精度定位，默认:true
            timeout: 10000, //超过10秒后停止定位，默认：5s
            buttonPosition: "RB", //定位按钮的停靠位置
            buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: false //定位成功后是否自动调整地图视野到定位点
          });
          that.map.addControl(geolocation);
          geolocation.getCurrentPosition((status, result) => {
            that.location = [result.position.lng, result.position.lat];
            if (status == "complete") {
              that.cityCode = result.addressComponent.citycode;
            } else {
              console.log(result);
            }
          });
        });
      },
      e => {
        console.log("地图加载失败", e);
      }
    );
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/css/mixin";
.seachParkingLots {
  height: 60px;
  box-sizing: border-box;
  overflow: hidden;
  .inputContainer {
    height: 40px;
    width: 280px;
    margin: 10px auto;
    border: 1px solid #ccc;
    border-radius: 20px;
    input {
      height: 38px;
      border-radius: 19px;
      border: none;
      width: 220px;
      padding-left: 15px;
      &::placeholder {
        color: #999;
      }
    }
    span {
      display: inline-block;
      width: 40px;
      text-align: right;
      border-left: 1px solid #999;
    }
  }
}
#container {
  height: 300px;
  width: 100%;
}
.resultNums {
  height: 40px;
  line-height: 38px;
  color: #333;
  font-size: 12px;
  text-align: center;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
.amap_lib_placeSearch {
  .poi-more {
    display: none;
  }
}
</style>