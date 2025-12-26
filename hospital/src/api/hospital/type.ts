import { type ResponseData, type Hospital } from '@/api/base/type';

// 定义详情模块数据类型

// 医院详情接口返回的响应数据类型
export interface HospitalDetailResponseData extends ResponseData {
    data: Hospital
}

// 医院科室类型
export interface Department {
  depcode: string
  depname: string
  children: Department[] | null
}

// 医院科室数组类型
export type DepartmentArr = Department[]

// 医院科室接口返回的响应数据类型
export interface DepartmentResponseData extends ResponseData {
  data: DepartmentArr
}

// 医院预约挂号列表接口参数类型
export interface BookSchedulelListRequestData {
  page: number
  limit: number
  hoscode: string
  depcode: string
}

// 医院预约挂号列表数据类型
export interface BookSchedulelData {
  workDate: string
  docCount: number
  reservedNumber: number
  availableNumber: number
  status: number,
  id: string
}

// 预约挂号列表基础数据类型
export interface BookScheduleBaseData {
  workDateString: string
  releaseTime: string
  stopTime: string
  bigname: string
  depname: string
  hosname: string
}

// 医院预约挂号列表接口返回的响应数据类型
export interface BookSchedulelListResponseData extends ResponseData {
  data: {
    bookingScheduleList: BookSchedulelData[],
    total: number,
    baseMap: BookScheduleBaseData
  }
}
