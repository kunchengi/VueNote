// 仓库内部存储数据state的类型

import { type Hospital } from "@/api/base/type";
import { type DepartmentArr } from '@/api/hospital/type'
import { type UserInfo } from '@/api/login/type'

export interface HospitalDetailState {
  hospitalDetail: Hospital,
  // 通知文章内容
  noticeArticle: string,
  // 医院科室数组
  departmentList: DepartmentArr
}

// 文章类型
export const ArticleType = {
  NOTICE: 'noticeArticle.html'
}

// 全局UI管理模块状态类型
export interface UiManageState {
  showLogin: boolean
}

// 微信登录数据模块状态类型
export interface WxLoginData {
  state: string,
  qrImgData: string | null,
}

// 用户数据模块状态类型
export interface UserDataState {
  userInfo: UserInfo | null,
  wxLoginData: WxLoginData,
}
