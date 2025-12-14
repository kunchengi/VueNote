import { defineStore } from "pinia";
import { reqHospitalDetail, reqArticleByFilename } from '@/api/hospital'
import { type Hospital } from "@/api/base/type";
import { type HospitalDetailResponseData } from '@/api/hospital/type'
import { type HospitalDetailState } from './interface'
import { ArticleType } from './interface'

// 医院详情模块
const useHospitalDetailStore = defineStore('HospitalDetail', {
  state: (): HospitalDetailState => ({
    hospitalDetail: {} as Hospital,
    // 通知文章内容
    noticeArticle: ''
  }),
  actions: {
    // 加载医院详情
    async loadHospitalDetail(hoscode: string): Promise<void> {
      const res: HospitalDetailResponseData = await reqHospitalDetail(hoscode)
      if (res.code === 200) {
        this.hospitalDetail = res.data
      }
    },
    // 通过文件名加载通知文章内容
    async loadNoticeArticle(): Promise<void> {
      // 如果已经有通知文章内容，直接返回
      if (this.noticeArticle) {
        return
      }
      const res: string = await reqArticleByFilename(ArticleType.NOTICE)
      if (res) {
        this.noticeArticle = res
      }
    },
  },
  getters: {
    // 获取医院详情
    hosname(state: HospitalDetailState): string {
      return state.hospitalDetail?.hosname || ''
    },
    hostypeString(state: HospitalDetailState): string {
      return state.hospitalDetail?.param?.hostypeString || ''
    },
    logoData(state: HospitalDetailState): string {
      return state.hospitalDetail?.logoData || ''
    },
    bookingRule(state: HospitalDetailState) {
      return state.hospitalDetail?.bookingRule || {}
    },
    fullAddress(state: HospitalDetailState): string {
      return state.hospitalDetail?.param?.fullAddress || ''
    },
    route(state: HospitalDetailState): string[] {
      return state.hospitalDetail?.route || []
    },
    ruleList(state: HospitalDetailState): string[] {
      return state.hospitalDetail?.bookingRule?.rule || []
    },
    intro(state: HospitalDetailState): string {
      return state.hospitalDetail?.intro || ''
    }
  }
})

export default useHospitalDetailStore