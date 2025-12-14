// 仓库内部存储数据state的类型

import { type Hospital } from "@/api/base/type";

export interface HospitalDetailState {
  hospitalDetail: Hospital,
  // 通知文章内容
  noticeArticle: string
}

// 文章类型
export const ArticleType = {
  NOTICE: 'noticeArticle.html'
}
