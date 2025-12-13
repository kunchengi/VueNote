import { defineStore } from "pinia";
import { reqHospitalDetail } from '@/api/hospital'
import { type Hospital } from "@/api/base/type";
import { type HospitalDetailResponseData } from '@/api/hospital/type'
// 医院详情模块

const useHospitalDetailStore = defineStore('HospitalDetail', {
  state: () => ({
    hospitalDetail: {} as Hospital,
  }),
  actions: {
    // 获取医院详情
    async getHospitalDetail(hoscode: string) {
      const res: HospitalDetailResponseData = await reqHospitalDetail(hoscode)
      if (res.code === 200) {
        this.hospitalDetail = res.data
      }
    }
  },
  getters: {
    
  }
})

export default useHospitalDetailStore