// 首页相关接口
import request from '@/utils/request'
import type { HospitalResponseData } from './type'


// 首页接口枚举
const HomeApi = {
  HOSPITAL_URL: '/hosp/hospital',
}

// 获取首页数据
export const reqHospital = (page: number, limit: number) => {
  return request.get<any, HospitalResponseData>(`${HomeApi.HOSPITAL_URL}/${page}/${limit}`)
}
