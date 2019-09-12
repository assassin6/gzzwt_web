import request from "../utils/request";

//查询号牌类型
export const getCarType =()=> request.get('common/geDicData/120')

//违章查询
export const getIlleagalRecord =(params) =>request.post('vehicle/getIlleagalRecord',{params})

//驾驶人违章查询
export const getIllegalRecord=(params)=>request.post('vehicle/getIllegalRecord',{params})

//申请临时牌照
export const applyTempCarNo=(params)=>request.post('vehicle/applyTempCarNo',{params})

//查询申请原因
export const getReasonType=(params)=>request.get('vehicle/getReasonType',{params})

//查询换证申告的义务和内容
export const getExchangeCertificateInfo=(params)=>request.get('vehicle/getExchangeCertificateInfo',{params})

//换证
export const exchangeCertificate=(params)=>request.post('vehicle/exchangeCertificate',{params})

//查询取件网点
export const getNetworks = () => request.get('common/geDicData/140')

//查询户籍所在地
export const getPermanetCities = () => request.get('common/geDicData/300')

//查询车辆产地
export const getCountries = () => request.get('common/geDicData/290')

//查询取件方式
export const getPickupWays = () => request.get('common/geDicData/280')

//查询省
export const getProvinces = () => request.get('common/getProvince')

//查询市
export const getCities = (params) => request.get(`common/getCity/${params.provinceCode}`)

//查询区
export const getAreas = (params) => request.get(`common/getArea/${params.cityCode}`)

//上传文件
export const uploadFile = (params) => request.post('common/uploadFile', {params})

//获取工本费和邮寄费
export const getFee = () => request.get('common/getExchangeCertificatePrice')