import request from '@/utils/request'

// 查询申领条件
export const getApplyTypes = () => request.get('common/geDicData/150')