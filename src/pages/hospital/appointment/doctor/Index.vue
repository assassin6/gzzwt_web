<template lang="pug">
div
  .doctor
    .doctorMes
      van-image(:src="data.picUrl" alt="头像" height="66" width="66")
      div
        .name
          span {{data.name}}
          span.level {{data.level}}
        .goodAt
          span {{data.expetise.toString()}}
        .hospital
          span {{data.hospitalName}}
  .timeConfigContainer
    .timeConfig
      .tableTitle
        div
        div 上午
        div 下午
      .column
        .perday(v-for="(item,index) in data.timeConfig")
          div
            span {{item.week}}
            span {{parseDate(item.time)}}
          div(:class="item.amConfig?'viable':''" @click="item.amConfig?checkAppointment(item.time,0,item.week):''")
            span {{item.amConfig?'点击预约':''}}
          div(:class="item.pmConfig?'viable':''" @click="item.pmConfig?checkAppointment(item.time,1,item.week):''")
            span {{item.pmConfig?'点击预约':''}}
  .expetise
    span.title 擅长领域
    span {{data.expetise.toString()}}
  .introduce
    span.title 医生简介
    span {{data.content}}
  van-popup(v-model="show" position="bottom" :style="{height:'50%'}")
    .appointmentDate {{appointmentDate.time}} {{appointmentDate.week}} {{appointmentDate.amPm?'下午':'上午'}}
    .pickDate
      app-link( v-for="(item,index) in viableAppointment" :to="{name:'hospital/appointment/confirmAppointment'}")
        div.viableTime
          span {{item.startTime}}-{{item.endTime}}
          span.viableNum 可约号源 {{item.num}}
 
      
</template>

<script>
import {
  getAppointmentConfig,
  getAppointmentConfigDetail
} from "@/api/hospital";
import moment from "@/utils/moment";
export default {
  name: "app",
  data() {
    return {
      data: {
        expetise: []
      },
      show: false,
      appointmentDate: {
        time: "", //搜索医生号源对应的日期 参数,
        week: "",
        amPm: ""
      },
      viableAppointment: [] //可约号源的时间段
    };
  },
  mounted() {},
  methods: {
    parseDate(date) {
      //将日期改为 09-03 的格式 date 的格式为2019-09-03
      let newDate = new Date(date);
      let month =
        newDate.getMonth() >= 10
          ? newDate.getMonth() + 1
          : `0${newDate.getMonth() + 1}`;
      let day =
        newDate.getDate() >= 10 ? newDate.getDate() : `0${newDate.getDate()}`;
      return `${month}-${day}`;
    },
    checkAppointment(time, amPm, week) {
      //time 预约的日期 am 上午或者下午 0上午 1下午
      this.show = !this.show;
      this.appointmentDate = {
        time,
        week,
        amPm
      };
      getAppointmentConfigDetail({ id: this.$query.doctorId, time, amPm }).then(
        res => {
          this.viableAppointment = res.data;
        }
      );
    }
  },
  components: {},
  async created() {
    await getAppointmentConfig({ doctorId: this.$query.doctorId }).then(res => {
      if (res.code !== 200) {
        console.log("获取医生数据错误");
      } else {
        this.data = res.data;
      }
    });
  }
};
</script>
<style lang="scss">
.doctor {
  height: 124px;
  display: flex;
  justify-content: space-between;
  padding: 29px 15px 29px 10px;
  .doctorMes {
    display: flex;
    font-size: 14px;
    img {
      height: 66px;
      width: 66px;
    }
    & > div {
      margin-left: 20px;
    }
    .name {
      font-size: 16px;
      margin-bottom: 12px;
      & > span:last-child {
        font-size: 12px;
        color: #333;
        background-color: #f2f2f2;
        margin-left: 10px;
        display: inline-block;
        padding: 3px;
        border-radius: 2px;
      }
    }
    .goodAt {
      margin-bottom: 5px;
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
.timeConfigContainer {
  padding: 15px 5px;
  background-color: #ccc;
}
.timeConfig {
  display: flex;
  background-color: #fff;
  border: 1px solid #aaa;
  .tableTitle {
    width: 42px;
    & > div {
      height: 42px;
      line-height: 40px;
      text-align: center;
    }
    & > div:not(:last-child) {
      border-bottom: 1px solid #aaa;
    }
  }
  .column {
    display: flex;
    flex: 1;
    overflow-x: auto;
    .perday {
      min-width: 42px;
      border-left: 1px solid #aaa;
      flex: 1;
      & > div:first-child {
        flex-direction: column;
      }
      & > div:not(:last-child) {
        border-bottom: 1px solid #aaa;
      }
      & > div {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 42px;
        text-align: center;
      }
      .viable {
        background-color: #aaa;
      }
    }
  }
}
.expetise,
.introduce {
  display: flex;
  flex-direction: column;
  padding: 15px;
  font-size: 12px;
  height: 110px;
  border-bottom: 1px solid #ccc;
  & > span:first-child {
    display: inline-block;
    border-left: 14px solid #f2f2f2;
    padding-left: 10px;
    height: 14px;
    vertical-align: middle;
    margin-bottom: 30px;
  }
}
.introduce {
  height: auto;
  border-bottom: none;
}
.appointmentDate {
  text-align: center;
  background-color: #ccc;
  font-size: 12px;
  line-height: 28px;
}
.pickDate {
  height: calc(100% - 88px);
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  overflow: auto;
  .app-link {
    min-height: 40px;
    width: 280px;
    margin: 0 auto;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: #333;
    border-bottom: 1px solid #ccc;
    .viableTime{
      width: 200px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  .app-link:last-child {
    border: none;
  }
  .viableNum{
    display: inline-block;
    text-align: left;
    width: 80px;
    font-size: 12px;
  }
}
</style>
