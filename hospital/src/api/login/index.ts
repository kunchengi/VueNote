import request from '@/utils/request';
import type { VerifyCodeResponseData, LoginRequestData, LoginResponseData } from './type';

// 请求地址的枚举
const LoginApi = {
  SEND_SMS_CODE: '/sms/send',
  USER_LOGIN: '/user/login',
}

// 模拟短信验证码发送接口
export const reqSendSmsCode = (phone: string) => {
  return request.get<any, VerifyCodeResponseData>(`${LoginApi.SEND_SMS_CODE}/${phone}`)
}

// 用户登录接口
export const reqUserLogin = (data: LoginRequestData) => {
  return request.post<any, LoginResponseData>(LoginApi.USER_LOGIN, data)
}
