import request from '../utils/request.js'


//学校查询分数
export const getSorce = (params) => request.post('education/getScore', {params})
