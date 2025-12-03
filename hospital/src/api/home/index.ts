// 首页相关接口
import request from '@/utils/request'

// 首页接口枚举
const HomeApi = {
  HOSPITAL_URL: '/hosp/hospital',
}

// 获取首页数据
export const reqHospital = (page: number, limit: number) => {
  return request.get(`${HomeApi.HOSPITAL_URL}/${page}/${limit}`)
}
