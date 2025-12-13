import { type ResponseData, type Hospital } from '@/api/base/type';

// 定义详情模块数据类型

// 医院详情接口返回的响应数据类型
export interface HospitalDetailResponseData extends ResponseData {
    data: Hospital
}