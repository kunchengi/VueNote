import { defineStore } from "pinia";
import { type UiManageState } from "@/store/modules/interface";

// 登录模块
const useUiManageStore = defineStore('UiManage', {
    state: (): UiManageState => ({
        showLogin: false
    }),
    actions: {
        
    }
})

export default useUiManageStore