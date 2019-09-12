import request from "../utils/request";

//查询号牌类型
export const getCarType =()=> request.get('common/geDicData/120')

//违章查询
export const getIlleagalRecord =(params) =>request.post('vehicle/getIlleagalRecord',{params})

//驾驶人违章查询
export const getIllegalRecord=(params)=>request.get('vehicle/getIllegalRecord',{params})

//申请临时牌照
export const applyTempCarNo=(params)=>request.get('vehicle/applyTempCarNo',{params})

//查询申请原因
export const getReasonType=(params)=>request.get('vehicle/getReasonType',{params})

//查询换证申告的义务和内容
export const getExchangeCertificateInfo=(params)=>request.get('vehicle/getExchangeCertificateInfo',{params})

//换证
export const exchangeCertificate=(params)=>request.get('vehicle/exchangeCertificate',{params})

//查询取件网点

//查询户籍所在地
export const getPermanetCities = () => request.get('common/geDicData/300')