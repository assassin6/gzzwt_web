<template lang="pug">
div
  .doctor
    .doctorMes
      img(:src="data.picUrl" alt="头像")
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
          div(:class="item.amConfig?'viable':''" @click="item.amConfig?checkAppointment(item.time):''")
            span {{item.amConfig?'点击预约':''}}
          div(:class="item.pmConfig?'viable':''" @click="item.pmConfig?checkAppointment(item.time):''")
            span {{item.pmConfig?'点击预约':''}}
  .expetise
    span.title 擅长领域
    span {{data.expetise.toString()}}
  .introduce
    span.title 医生简介
    span {{data.content}}
  
</template>

<script>
import { getAppointmentConfig } from "@/api/hospital";
import moment from "@/utils/moment";
export default {
  name: "app",
  data() {
    return {
      data: {
        expetise: []
      }
    };
  },
  mounted() {
    getAppointmentConfig({ doctorId: this.$query.doctorId }).then(res => {
      if (res.code !== 200) {
        console.log("获取医生数据错误");
      } else {
        this.data = res.data;
      }
    });
  },
  methods: {
    changeDate(date) {
      //修改日期的条件 date的格式为 2019-09-11
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
      return `${month}-${day}`;
    },
    checkAppointment() {
      console.log(1);
    }
  },
  components: {}
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
</style>
