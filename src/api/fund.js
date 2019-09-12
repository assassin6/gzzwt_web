
import request from "../utils/request";

//查询公积金账号信息
export const getFundAccountInfo=(params)=>request.get('fund/getAccountInfo',{params})

//公积金查询缴存明细
export const getFundDetail=(params) => request.get(`fund/getFundDetail/${params.year}`, {params})

//查询网点区域 网点银行
export const getAreaAndBankType=(params)=>request.get('fund/getAreaAndBankType',{params})

//查询网点银行
export const getBankData=(params)=>request.get('fund/getBankData',{params});

//查询预约上下午时间配置
export const getAppointmentConfig=(params)=>request.get('fund/getAppointmentConfig',{params})

//点击预约(查询预约时段配置及可预约数)
export const getAppointmentConfigDetail=(params)=>request.get('fund/getAppointmentConfigDetail',{params})

//预约信息点击确认(提交预约信息)
export const saveAppointment=(params)=>request.get('fund/saveAppointment',{params})

//查询最早的公积金缴存时间
export const getFundMinTime=(params)=>request.get('fund/getFundMinTime',{params})