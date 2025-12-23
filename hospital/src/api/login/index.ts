import request from '@/utils/request';
import type { VerifyCodeResponseData, LoginRequestData, LoginResponseData, WxLoginQrcodeResponseData, WxLoginRefreshRequestData, WxLoginRefreshResponseData } from './type';

// 请求地址的枚举
const LoginApi = {
  // 发送短信验证码
  SEND_SMS_CODE: '/sms/send',
  // 用户手机登录
  USER_LOGIN: '/user/login',
  // 获取微信登录二维码信息
  GET_WX_LOGIN_QRCODE: '/user/wx_qr_link',
  // 获取微信登录扫码结果接口
  GET_WX_LOGIN_RESULT: '/user/wx_refresh',
}

// 模拟短信验证码发送接口
export const reqSendSmsCode = (phone: string) => {
  return request.get<any, VerifyCodeResponseData>(`${LoginApi.SEND_SMS_CODE}/${phone}`)
}

// 用户登录接口
export const reqUserLogin = (data: LoginRequestData) => {
  return request.post<any, LoginResponseData>(LoginApi.USER_LOGIN, data)
}

// 获取微信登录二维码信息接口
export const reqGetWxLoginQrcode = () => {
  return request.post<any, WxLoginQrcodeResponseData>(LoginApi.GET_WX_LOGIN_QRCODE, {reg_source: ''})
}

// 获取微信登录扫码结果接口
export const reqGetWxLoginResult = (data: WxLoginRefreshRequestData) => {
  return request.post<any, WxLoginRefreshResponseData>(LoginApi.GET_WX_LOGIN_RESULT, data)
}
