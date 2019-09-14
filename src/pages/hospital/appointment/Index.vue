<template  lang="pug">
  .appointment
    .searchHospital
      input(placeholder="搜索医院" @input='getHospital()')
    .appointment-nav
      van-dropdown-menu()
        van-dropdown-item(v-model="cityValue" :options="cityOption" @change='changeArea')
        van-dropdown-item(v-model="typeValue" :options="typeOption" @change='changeType')
    ul.list(v-if="hospitalList.length")
      li.list-item(v-for="(item,index) in hospitalList" )
        app-link(:to="{name:'hospital/appointment/department',query:{hospitalId:item.id}}")
          h3.list-title 
            span.list-title-text {{item.name}}
            van-tag(type="primary") {{item.levelAlias}}
          .list-body
            .list-body-left
              div
                span.list-body-label 等级
                span {{item.level}}
              div
                span.list-body-label 地址
                span {{item.address}}
            .list-body-right  
              span {{item.distance}}km
              span.near {{index===0?'距离最近':''}}
    div#noHospital(v-if="hospitalList.length === 0") 
      div 暂无符合条件的医院
      div 请尝试修改搜索的条件
          
</template>

<script>
import { openPage } from "@/utils/jsBrige";
import { getArea, geDicData, getHospitals } from "@/api/hospital";
export default {
  name: "appointment",
  data() {
    return {
      searchValue: "",
      cityValue: 0,
      typeValue: 0,
      cityOption: [
        { text: "全市", value: 0 },
        { text: "越秀区", value: 1 },
        { text: "海珠区", value: 2 }
      ],
      typeOption: [
        { text: "全类", value: 0 },
        { text: "综合医院", value: 1 },
        { text: "专科医院", value: 2 },
        { text: "医保定点", value: 3 }
      ],
      searcCondition: {
        name: "",
        areaCode: "",
        typeCode: "",
        page: 1,
        size: 10
      },
      areaCodeList: [], //请求到的医院的areaCode 和 cityOption对应
      hospitalTypeList: [], //医院分类的代码
      hospitalList: []
    };
  },
  methods: {
    changeArea(value) {
      this.searcCondition.areaCode = this.areaCodeList[value];
      this.getHospital();
    },
    changeType(value) {
      this.searcCondition.typeCode = this.hospitalTypeList[value];
      this.getHospital();
    },
    getHospital() {
      getHospitals(this.searcCondition).then(res => {
        this.hospitalList = res.data;
      });
    }
  },
  mounted() {
  },
  components: {},
  async created() {
    await this.getHospital();
    await getArea().then(res => {
      if (res.code !== 200) {
        alert("获取医院分区错误");
      } else {
        this.cityOption = [];
        this.cityOption.push({ text: "全市", value: 0 });
        this.areaCodeList.push("");
        for (let i in res.data) {
          this.cityOption.push({
            text: res.data[i].name,
            value: Number(i) + 1
          });
          this.areaCodeList.push(res.data[i].code);
        }
      }
    });
    await geDicData().then(res => {
      if (res.code !== 200) {
        alert("获取医院分类错误");
      } else {
        this.typeOption = [];
        this.typeOption.push({ text: "全类", value: 0 });
        this.hospitalTypeList.push("");
        for (let i in res.data) {
          this.typeOption.push({
            text: res.data[i].name,
            value: Number(i) + 1
          });
          this.hospitalTypeList.push(res.data[i].code);
        }
      }
    });
  }
};
</script>
<style lang="scss" scoped>
$borderColor: rgb(204, 204, 204);
$grayText: rgb(153, 153, 153);
.appointment-nav {
  border-top: 1px solid $borderColor;
  border-bottom: 1px solid $borderColor;
}
.list {
  .list-title {
    margin: 0 0 10px 0;
    .list-title-text {
      margin-right: 10px;
    }
  }
  .list-item {
    padding: 15px;
    border-bottom: 1px solid $borderColor;
  }
  .list-body {
    display: flex;
    justify-content: space-between;
    .list-body-left {
      line-height: 24px;
      & > div {
        .list-body-label {
          color: $grayText;
          margin-right: 8px;
        }
      }
    }
    .list-body-right {
      float: right;
      display: flex;
      flex-direction: column;
      .near {
        font-size: 12px;
      }
    }
  }
}
.searchHospital {
  height: 60px;
  overflow: hidden;
  input {
    height: 40px;
    display: block;
    border: 1px solid #ccc;
    width: 280px;
    border-radius: 20px;
    box-sizing: border-box;
    margin: 10px auto;
    padding-left: 15px;
  }
}
.van-dropdown-menu > div:last-child {
  border-left: 1px solid #ccc !important;
}
#noHospital {
  text-align: center;
  height: 200px;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>
