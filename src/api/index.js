import request from '../utils/request.js'


export const getVerifyCode = (params) => request.get(`common/getVerifyCode/${params.modelCode}`, {params})




