
// 定义用户相关数据类型

// 就诊人信息请求参数类型
export interface PatientInfo {
    id?: string
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
