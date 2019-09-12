module.exports = {
  template: {
    title: 'Template'
  },
  index: {
    title: '首页', // 标题名称
    path: 'index.html' // 路径
  },
  hospital: {
    title: '医院业务',
    path: 'hospital.html',
    appointment: {
      title: '预约挂号',
      path: 'hospital/appointment.html',
      department:{
        title: '选择科室',
        path: 'hospital/appointment/department.html',
      },
      doctor:{
        title: '选择医生',
        path: 'hospital/appointment/doctor.html',
      },
      doctorList: {
        title: '医生列表',
        path: 'hospital/appointment/doctorList.html',
      }
    }
  },
  traffic:{
    title:"交通业务",
    bus:{
      title:"公交查询",
      path:"traffic/bus.html"
    },
    parkingLots:{
      title:"停车场查询",
      path:"traffic/parkingLots.html"
    }
  }
}
