import request from '@/utils/request';
import { type HospitalDetailResponseData, type DepartmentResponseData, type BookSchedulelListRequestData, type BookSchedulelListResponseData } from '@/api/hospital/type';

// 请求地址的枚举
const HospitalApi = {
  FIND_BY_HOSCODE: '/hosp/hospital',
  // 通过文件名获取文件内容
  GET_ARTICLE_BY_FILENAME: '/hosp/article',
  // 获取医院科室信息
  GET_DEPARTMENT_BY_HOSCODE: '/hosp/hospital/department',
  // 获取医院预约挂号列表
  GET_BOOK_SCHEDULE_LIST: '/hosp/hospital/auth/getBookingScheduleRule',
}
// 根据医院编码获取医院详情
export const reqHospitalDetail = (hoscode: string) => {
  return request.get<any, HospitalDetailResponseData>(`${HospitalApi.FIND_BY_HOSCODE}/${hoscode}`)
}
// 通过文件名获取文件内容
export const reqArticleByFilename = (filename: string) => {
  return request.get<any, string>(`${HospitalApi.GET_ARTICLE_BY_FILENAME}/${filename}`)
}
// 获取医院科室信息
export const reqDepartmentByHoscode = (hoscode: string) => {
  return request.get<any, DepartmentResponseData>(`${HospitalApi.GET_DEPARTMENT_BY_HOSCODE}/${hoscode}`)
}
// 获取医院预约挂号列表
export const reqBookScheduleList = (params: BookSchedulelListRequestData) => {
  return request.get<any, BookSchedulelListResponseData>(`${HospitalApi.GET_BOOK_SCHEDULE_LIST}`, {
    params: params
  })
}
