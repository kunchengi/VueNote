import { type ResponseData } from '@/api/base/type';

// 定义登录模块数据类型

// 模拟短信验证码发送接口返回的响应数据类型
export interface VerifyCodeResponseData extends ResponseData {
  data: string
}

// 用户登录接口请求参数类型
export interface LoginRequestData {
  phone: string
  code: string
}

// 用户信息
export interface UserInfo {
  name: string,
  token: string
}

// 用户登录接口返回的响应数据类型
export interface LoginResponseData extends ResponseData {
  data: UserInfo
}

// 微信登录二维码信息数据类型
export interface WxLoginQrcodeData {
  qrLink: string,
  state: string,
}

// 获取微信登录二维码信息接口返回的响应数据类型
export interface WxLoginQrcodeResponseData extends ResponseData {
  data: WxLoginQrcodeData
}