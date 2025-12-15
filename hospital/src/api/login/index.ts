import request from '@/utils/request';
import type { LoginResponseData } from './type';

// 请求地址的枚举
const LoginApi = {
  SEND_SMS_CODE: '/sms/send'
}

// 模拟短信验证码发送接口
export const reqSendSmsCode = (phone: string) => {
  return request.get<any, LoginResponseData>(`${LoginApi.SEND_SMS_CODE}/${phone}`)
}
