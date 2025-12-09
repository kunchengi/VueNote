// 首页相关接口
import request from '@/utils/request'
import type { HospitalResponseData, DictResponseData } from './type'


// 首页接口枚举
const HomeApi = {
  // 医院列表接口
  HOSPITAL_URL: '/hosp/hospital',
  // 获取医院等级与北京各区列表接口
  FIND_DICT_URL: '/cmn/dict/findByDictCode',
}

// 获取首页数据
export const reqHospital = (page: number, limit: number, hostype: string = '', districtCode: string = '') => {
  return request.get<any, HospitalResponseData>(`${HomeApi.HOSPITAL_URL}/${page}/${limit}?hostype=${hostype}&districtCode=${districtCode}`)
}

// 获取医院等级与北京各区列表
export const reqDict = (dictCode: string) => {
  return request.get<any, DictResponseData>(`${HomeApi.FIND_DICT_URL}/${dictCode}`)
}