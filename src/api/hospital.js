import request from "../utils/request";
//获取医院分区
export const getArea = () => request.get('common/getArea/440100')

//获取医院分类
export const geDicData = () => request.get('common/geDicData/270')

//获取医院
export const getHospitals = (params) => request.post('hospital/getHospitals',{params})

//获取医院的科室
export const getHospitalDepartments = (params) => request.get(`/hospital/getHospitalDepartments/${params.hospitalId}`)

//获取医生列表
export const getDoctors = (params) => request.post('hospital/getDoctors',{params})

//获取医生详情 预约号源
export const getAppointmentConfig = (params) => request.get(`/hospital/getAppointmentConfig/${params.doctorId}`)