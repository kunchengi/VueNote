import { defineStore } from "pinia";
import { reqHospitalDetail } from '@/api/hospital'
import { type Hospital } from "@/api/base/type";
import { type HospitalDetailResponseData } from '@/api/hospital/type'
import { type HospitalDetailState } from './interface'
// 医院详情模块

const useHospitalDetailStore = defineStore('HospitalDetail', {
  state: (): HospitalDetailState => ({
    hospitalDetail: {} as Hospital,
  }),
  actions: {
    // 获取医院详情
    async getHospitalDetail(hoscode: string) {
      console.log('获取医院详情', hoscode);
      const res: HospitalDetailResponseData = await reqHospitalDetail(hoscode)
      if (res.code === 200) {
        this.hospitalDetail = res.data
      }
    }
  },
  getters: {
    // 获取医院详情
    hosname(state: HospitalDetailState) {
      return state.hospitalDetail?.hosname || ''
    },
    hostypeString(state: HospitalDetailState) {
      return state.hospitalDetail?.param?.hostypeString || ''
    },
    logoData(state: HospitalDetailState) {
      return state.hospitalDetail?.logoData || ''
    },
    bookingRule(state: HospitalDetailState) {
      return state.hospitalDetail?.bookingRule || {}
    },
    fullAddress(state: HospitalDetailState) {
      return state.hospitalDetail?.param?.fullAddress || ''
    },
    route(state: HospitalDetailState) {
      return state.hospitalDetail?.route || []
    },
    ruleList(state: HospitalDetailState) {
      return state.hospitalDetail?.bookingRule?.rule || []
    },
    intro(state: HospitalDetailState) {
      return state.hospitalDetail?.intro || ''
    }
  }
})

export default useHospitalDetailStore