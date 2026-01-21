import request from '@/utils/request';
import type { PatientInfo } from './type';

// 请求地址的枚举
const UserApi = {
    // 保存（添加）就诊人信息
    ADD_PATIENT: '/user/patient/auth/save',
    // 更新就诊人信息
    UPDATE_PATIENT: '/user/patient/auth/update',
}

// 添加或修改就诊人信息
export const addOrUpdatePatient = (patientInfo: PatientInfo) => {
    // 有id则更新，无id则添加
    if (patientInfo.id) {
        return request.put<any, any>(UserApi.UPDATE_PATIENT, patientInfo);
    } else {
        return request.post<any, any>(UserApi.ADD_PATIENT, patientInfo);
    }
}