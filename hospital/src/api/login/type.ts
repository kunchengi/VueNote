import { type ResponseData } from '@/api/base/type';

// 定义登录模块数据类型

// 模拟短信验证码发送接口返回的响应数据类型
export interface LoginResponseData extends ResponseData {
  data: string
}
