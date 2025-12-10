// 首页相关接口
import request from '@/utils/request'
import type { HospitalResponseData, DictResponseData, FindHospitalResponseData } from './type'


// 首页接口枚举
const HomeApi = {
  // 医院列表接口
  HOSPITAL_URL: '/hosp/hospital',
  // 获取医院等级与北京各区列表接口
  FIND_DICT_URL: '/cmn/dict/findByDictCode',
  // 根据医院名称模糊查询接口
  FIND_HOSPITAL_URL: '/hosp/hospital/findByHosname',
}

// 获取首页数据
export const reqHospital = (page: number, limit: number, hostype: string = '', districtCode: string = '') => {
  return request.get<any, HospitalResponseData>(`${HomeApi.HOSPITAL_URL}/${page}/${limit}?hostype=${hostype}&districtCode=${districtCode}`)
}

// 获取医院等级与北京各区列表
export const reqDict = (dictCode: string) => {
  return request.get<any, DictResponseData>(`${HomeApi.FIND_DICT_URL}/${dictCode}`)
}

// 根据医院名称模糊查询医院列表
export const reqFindHospital = (hosname: string) => {
  return request.get<any, FindHospitalResponseData>(`${HomeApi.FIND_HOSPITAL_URL}/${hosname}`)
}
