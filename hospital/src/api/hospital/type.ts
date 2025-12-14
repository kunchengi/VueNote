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