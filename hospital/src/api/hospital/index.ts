import request from '@/utils/request';
import { type HospitalDetailResponseData } from '@/api/hospital/type';

// 请求地址的枚举
const HospitalApi = {
  FIND_BY_HOSCODE: '/hosp/hospital',
}
// 根据医院编码获取医院详情
export const reqHospitalDetail = (hoscode: string) => {
  return request.get<any, HospitalDetailResponseData>(`${HospitalApi.FIND_BY_HOSCODE}/${hoscode}`)
}