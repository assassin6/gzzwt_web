<template lang="pug">
div
  .chooseDate
    .viableDate(@click="changeDate")
        span 全部
        span 日期
    .viableDate(v-for="item in data.dateConfig" @click="changeDate(item.time)")
      span {{parseDate(item.time)}}
      span {{item.week}}
  .chooseDoctor
    app-link(v-for="item in data.doctors" :to="{name:'hospital/appointment/doctor',query:{doctorId:item.id}}")
      .doctor
        .doctorMes
          van-image(:src="item.picUrl" alt="头像" width='66' height="66")
          div
            .name
              span {{item.name}}
              span.level {{item.level}}
            .goodAt
              span 擅 长
              span {{item.expetise.toString()}}
            .viableNum
              span 可约号源
              span {{item.num}}
        .ifViable(v-if="item.num") 有号
</template>

<script>
import moment from "@/utils/moment";
import { getDoctors } from "@/api/hospital";
export default {
  name: "app",
  data() {
    return {
      searchDoctor: {
        id: this.$query.id,
        typeCode: this.$query.typeCode,
        size: 5,
        page: 1,
        date: ""
      },
      data: {}
    };
  },
  mounted() {
  },
  methods: {
    getDoctors() {
      getDoctors(this.searchDoctor).then(res => {
        if (res.code !== 200) {
          console.log("获取医生列表数据错误");
        } else {
          this.data = res.data;
        }
      });
    },
    changeDate(date = "") {
      //修改日期的条件 date的格式为 2019-09-11
      this.searchDoctor.date = date;
      this.getDoctors();
    },
    parseDate(date) {
      //将日期改为 09/03 的格式 date 的格式为2019-09-03
      let newDate = new Date(date);
      let month =
        newDate.getMonth() >= 10
          ? newDate.getMonth() + 1
          : `0${newDate.getMonth() + 1}`;
      let day =
        newDate.getDate() >= 10 ? newDate.getDate() : `0${newDate.getDate()}`;
      return `${month}/${day}`;
    }
  },
  components: {},
  async created(){
    await this.getDoctors();
  }
};
</script>
<style lang="scss">
.chooseDate {
  display: flex;
  flex-wrap: nowrap;
  height: 50px;
  align-items: center;
  overflow-x: auto;
  background-color: aliceblue;
  .viableDate {
    height: 50px;
    text-align: center;
    min-width: 70px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
.chooseDoctor {
  .doctor {
    height: 124px;
    display: flex;
    justify-content: space-between;
    padding: 29px 15px 29px 10px;

    .doctorMes {
      display: flex;
      & > div {
        margin-left: 20px;
      }
      img {
        height: 66px;
        width: 66px;
      }
      .name {
        font-size: 16px;
        margin-bottom: 12px;
        & > span:last-child {
          font-size: 12px;
          color: #999;
          margin-left: 10px;
        }
      }
      .goodAt {
        font-size: 14px;
        margin-bottom: 5px;
        & > span:first-child {
          font-size: 12px;
          color: #999;
          margin-right: 10px;
        }
      }
      .viableNum {
        font-size: 14px;
        & > span:first-child {
          font-size: 12px;
          color: #999;
          margin-right: 10px;
        }
      }
    }
    & > div {
      height: 66px;
    }
    .ifViable {
      height: 22px;
      width: 46px;
      text-align: center;
      line-height: 22px;
      background-color: #2395f1;
      color: #fff;
      border-radius: 4px;
    }
  }
}
</style>
