import { type ResponseData } from '@/api/base/type';

// 定义用户相关数据类型

// 就诊人信息请求参数类型
export interface PatientInfo {
    id?: string// 就诊人id
    createTime?: string// 创建时间
    updateTime?: string// 更新时间
    isDeleted?: number// 是否删除
    userId?: string// 账号id
    name: string
    certificateType: number
    certificateNumber: string
    sex: number
    birthDay: string
    phone: string
    isMarry: number
    isInsurance: number
    address: string
}


// 就诊人信息列表响应数据类型
export interface PatientInfoListResponseData extends ResponseData {
    data: PatientInfo[]// 就诊人信息列表
}
