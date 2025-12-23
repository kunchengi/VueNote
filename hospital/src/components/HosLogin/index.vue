<template>
    <div class="hos-login">
        <el-dialog v-model="uiManageStore.showLogin" title="登录" width="400">
            <div class="hos-login__content">
                <div class="hos-login__phone" v-if="loginMode === LoginMode.PHONE">
                    <el-form :model="phoneForm" :rules="phoneFromRules">
                        <el-form-item prop="phone">
                            <el-input v-model="phoneForm.phone" placeholder="请输入手机号" :prefix-icon="Iphone"></el-input>
                        </el-form-item>
                        <el-form-item class="hos-login__code" prop="code">
                            <el-input v-model="phoneForm.code" placeholder="请输入验证码" :prefix-icon="Lock">
                                <template #append>
                                    <el-button :disabled="disabledVerifyCode || showCountdown" @click="handleGetCode">
                                        <hos-countdown v-if="showCountdown" :time="60" @finish="handleCountdownFinish" />
                                        <span v-else>获取验证码</span>
                                    </el-button>
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="handleLogin" class="hos-login__btn" :disabled="disabledLogin">登录/注册</el-button>
                        </el-form-item>
                        <div class="hos-login__change" @click="changeLoginMode(LoginMode.WECHAT)">
                            <i class="iconfont icon-weixin"></i>
                        </div>

                    </el-form>
                </div>
                <div class="hos-login__wechat" v-else>
                    <div class="hos-login__title">
                        <span>请使用微信扫描登录</span>
                    </div>
                    <div class="hos-login__qrcode">
                        <img v-if="userDataStore.wxLoginData.qrImgData" :src="userDataStore.wxLoginData.qrImgData" alt="微信登录二维码">
                        <el-icon v-else @click="getWxLoginQrcode" class="hos-login__refresh"><Refresh /></el-icon>
                    </div>
                    <div class="hos-login__change" @click="changeLoginMode(LoginMode.PHONE)">
                        <i class="iconfont icon-shouji"></i>
                    </div>
                </div>
            </div>

        </el-dialog>
    </div>
</template>

<script setup lang="ts" name="HosLogin">
import { reactive, ref, computed, onUnmounted } from "vue";
import { ElMessage } from 'element-plus'
import type { FormRules } from 'element-plus'
import { Iphone, Lock, Refresh } from "@element-plus/icons-vue";
import useUiManageStore from "@/store/modules/uiManage";
import useUserDataStore from "@/store/modules/userData";
import { reqSendSmsCode, reqUserLogin, reqGetWxLoginQrcode, reqGetWxLoginResult } from "@/api/login";
import type { VerifyCodeResponseData, LoginRequestData, LoginResponseData, WxLoginQrcodeResponseData, WxLoginRefreshRequestData, WxLoginRefreshResponseData } from "@/api/login/type";
import HosCountdown from "@/components/HosCountdown/index.vue";

const uiManageStore = useUiManageStore();
const userDataStore = useUserDataStore();


// 登录模式
const LoginMode = {
    PHONE: "phone",
    WECHAT: "wechat"
}

// 登录模式类型
type LoginModeType = (typeof LoginMode)[keyof typeof LoginMode];

// 当前登录模式
const loginMode = ref(LoginMode.PHONE);


// 手机登录表单数据模型实例
const phoneForm = reactive<LoginRequestData>({
    phone: "",
    code: ""
});

// 验证码倒计时是否显示
const showCountdown = ref(false);

// 手机号是否合法
const isLegalPhone = (phone: string) => {
    const telStr = /^[1](([3][0-9])|([4][0,1,4-9])|([5][0-3,5-9])|([6][2,5,6,7])|([7][0-8])|([8][0-9])|([9][0-3,5-9]))[0-9]{8}$/;
    return telStr.test(phone);
}

// 校验验证码是否合法
const isLegalCode = (code: string) => {
    const codeStr = /^[0-9]{6}$/;
    return codeStr.test(code);
}

// 校验手机号是否合法
const checkPhone = (rule: any, value: string, callback: any) => {
    return isLegalPhone(value) ? callback() : callback(new Error("请输入正确的手机号"));
}

// 校验验证码是否禁用
const disabledVerifyCode = computed(() => {
    return !isLegalPhone(phoneForm.phone);
})

// 校验验证码是否合法
const checkCode = (rule: any, value: string, callback: any) => {
    return isLegalCode(value) ? callback() : callback(new Error("请输入正确的验证码"));
}

// 登录按钮是否禁用
const disabledLogin = computed(() => {
    return !isLegalPhone(phoneForm.phone) || !isLegalCode(phoneForm.code);
})



// 手机登录表单校验规则
const phoneFromRules = reactive<FormRules<LoginRequestData>>({
    phone: [
        { validator: checkPhone, trigger: 'blur' }
    ],
    code: [
        { validator: checkCode, trigger: ["blur"] }
    ]
});

// 登录
const handleLogin = async () => {
    try {
        // 发送登录请求
        const res: LoginResponseData = await reqUserLogin(phoneForm);
        if (res.code === 200) {
            ElMessage.success("登录成功");
            // 存储用户信息
            userDataStore.setUserInfo(res.data);
            // 关闭登录弹窗
            uiManageStore.showLogin = false;
        }
    } catch (error: any) {
        ElMessage.error(error.response?.data?.message || error.message);
    }
}

// 获取验证码
const handleGetCode = async () => {
    try {
        showCountdown.value = true;
        // 正常开发只需要发送请求，后端会发送验证码到手机号，前端点登录时校验验证码是否正确
        // 这里为了方便演示，直接将验证码返回给前端，前端校验验证码是否正确
        const res: VerifyCodeResponseData = await reqSendSmsCode(phoneForm.phone);
        if (res.code === 200) {
            ElMessage.success("验证码发送成功");
            phoneForm.code = res.data;
        }
    } catch (error: any) {
        ElMessage.error(error.response?.data?.message || error.message);
    }
}

// 切换登录模式
const changeLoginMode = (mode: LoginModeType) => {
    loginMode.value = mode;
    if (mode === LoginMode.WECHAT) {
        // 刷新微信登录二维码
        getWxLoginQrcode();
    }
}

let pollTimer: any | null = null;

// 获取微信登录二维码
const getWxLoginQrcode = async () => {
    try {
        // 获取微信登录二维码信息
        const res: WxLoginQrcodeResponseData = await reqGetWxLoginQrcode();
        if (res.code === 200) {
            // 存储微信登录二维码信息
            userDataStore.setWxLoginQrcodeData(res.data);
            // 轮询后端，查询登录状态
            pollTimer = setInterval(async () => {
                const reqData: WxLoginRefreshRequestData = {
                    type: 'weixin',
                    callbackType: 0,
                    state: userDataStore.wxLoginData?.state || '',

                }
                const statusRes = await reqGetWxLoginResult(reqData);
                console.log('statusRes', statusRes);
                if(statusRes.code === 200 && statusRes.data?.token)
                {
                    clearInterval(pollTimer);
                    ElMessage.success("登录成功");
                    const userInfo = {
                        name: statusRes.data?.name || '',
                        token: statusRes.data?.token || '',
                    }
                    // 存储用户信息
                    userDataStore.setUserInfo(userInfo);
                    // 关闭登录弹窗
                    uiManageStore.showLogin = false;
                }
            }, 5000); // 2秒轮询一次，可根据需求调整
        }
    } catch (error: any) {
        ElMessage.error(error.response?.data?.message || error.message);
    }
}

// 验证码倒计时结束
const handleCountdownFinish = () => {
    showCountdown.value = false;
}

// 组件卸载时，清除微信登录二维码信息
onUnmounted(() => {
    // 清除微信登录二维码信息
    userDataStore.setWxLoginQrcodeData(null);
    // 清除轮询定时器
    if(pollTimer) {
        clearInterval(pollTimer);
        pollTimer = null;
    }
})

</script>

<style lang="scss" scoped>
.hos-login {
    :deep(.el-dialog__body) {
        border-top: 1px solid #eee;
    }

    .hos-login__content {
        margin: 50px 0;
        padding: 20px;
        border: 1px solid #eee;
        border-radius: 5px;

        .hos-login__phone {
            .hos-login__code {

                :deep(.el-input-group__append) {
                    background-color: #fff;
                    color: #55a6fe;

                    &:hover {
                        background-color: #f9f9f9;
                    }
                }
            }
        }

        .hos-login__btn {
            width: 100%;
        }

        .hos-login__change {
            display: flex;
            justify-content: center;

            .iconfont {
                cursor: pointer;
                font-size: 32px;
                &:hover {
                    color: #28C445;
                }
            }
        }

        .hos-login__wechat {
            display: flex;
            flex-direction: column;
            align-items: center;
            
            .hos-login__title {
                color: #000;
                font-size: 20px;
                font-weight: bold;
            }
            
            .hos-login__qrcode {
                width: 200px;
                height: 200px;
                margin: 20px 0;
                border: 1px solid #eee;
                border-radius: 10px;
                display: flex;
                justify-content: center;
                align-items: center;

                img {
                    width: 100%;
                    height: 100%;
                    border: 1px solid #eee;
                    border-radius: 10px;
                }

                .hos-login__refresh {
                    cursor: pointer;
                    font-size: 32px;
                    &:hover {
                        color: #55a6fe;
                    }
                }
            }
        }
    }

}
</style>