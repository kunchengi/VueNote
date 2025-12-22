import { defineStore } from 'pinia'
import QRCode from 'qrcode';
import { type UserInfo, type WxLoginQrcodeData} from '@/api/login/type'
import { type UserDataState } from '@/store/modules/interface/index'

// 定义用户数据模块
const useUserDataStore = defineStore('userData', {
  state: (): UserDataState => ({
    userInfo: null as UserInfo | null,
    wxLoginData: {
      state: '',
      qrImgData: null,
    }

  }),
  actions: {
    setUserInfo(userInfo: UserInfo | null) {
      this.userInfo = userInfo;
    },
    clearUserInfo() {
      this.userInfo = null;
    },
    setWxLoginQrcodeData(wxLoginQrcodeData: WxLoginQrcodeData | null) {
      this.wxLoginData.state = wxLoginQrcodeData?.state || '';
      if (wxLoginQrcodeData) {
        QRCode.toDataURL(wxLoginQrcodeData.qrLink, (error, url) => {
          if (error) {
            console.error(error);
          } else {
            this.wxLoginData.qrImgData = url;
          }
        });
      } else {
        this.wxLoginData.qrImgData = null;
      }
    },
  },
  // 使用持久化插件，将 userInfo 字段持久化到 localStorage 中
  // 也可以不使用插件，手动使用 localStorage 进行存储
  persist: {
    key: 'userInfo', // 自定义存储 Key
    pick: ['userInfo'], // 仅持久化 userInfo 字段
  }
}
)


export default useUserDataStore;