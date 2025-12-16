<template>
    <div class="login">
        <el-dialog v-model="uiManageStore.showLogin" title="登录" width="400">
            <div class="login-content">
                <div class="phone-login" v-if="loginMode === LoginMode.PHONE">
                    <el-form :model="phoneForm" :rules="phoneFromRules">
                        <el-form-item prop="phone">
                            <el-input v-model="phoneForm.phone" placeholder="请输入手机号" :prefix-icon="Iphone"></el-input>
                        </el-form-item>
                        <el-form-item class="code-input" prop="code">
                            <el-input v-model="phoneForm.code" placeholder="请输入验证码" :prefix-icon="Lock">
                                <template #append>
                                    <el-button :disabled="disabledVerifyCode || showCountdown" @click="handleGetCode">
                                        <Countdown v-if="showCountdown" :time="60" @finish="handleCountdownFinish"></Countdown>
                                        <span v-else>获取验证码</span>
                                    </el-button>
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="handleLogin" class="login-btn">登录</el-button>
                        </el-form-item>
                        <div class="change-login-icon" @click="changeLoginMode(LoginMode.WECHAT)">
                            <i class="iconfont icon-weixin"></i>
                        </div>

                    </el-form>
                </div>
                <div class="wechat-login" v-else>
                    <div class="change-login-icon" @click="changeLoginMode(LoginMode.PHONE)">
                        <i class="iconfont icon-shouji"></i>
                    </div>
                </div>
            </div>

        </el-dialog>
    </div>
</template>

<script setup lang="ts" name="Login">
import { reactive, ref, computed } from "vue";
import { ElMessage } from 'element-plus'
import type { FormRules } from 'element-plus'
import { Iphone, Lock } from "@element-plus/icons-vue";
import useUiManageStore from "@/store/modules/uiManage";
import { reqSendSmsCode } from "@/api/login";
import Countdown from "@/components/countdown/index.vue";

const uiManageStore = useUiManageStore();

// 登录模式
const LoginMode = {
    PHONE: "phone",
    WECHAT: "wechat"
}

// 登录模式类型
type LoginModeType = (typeof LoginMode)[keyof typeof LoginMode];

// 当前登录模式
const loginMode = ref(LoginMode.PHONE);

// 手机登录表单数据模型
interface PhoneRuleForm {
    phone: string;
    code: string;
}

// 手机登录表单数据模型实例
const phoneForm = reactive<PhoneRuleForm>({
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
    return value.length === 6 ? callback() : callback(new Error("请输入正确的验证码"));
}

// 手机登录表单校验规则
const phoneFromRules = reactive<FormRules<PhoneRuleForm>>({
    phone: [
        { validator: checkPhone, trigger: 'blur' }
    ],
    code: [
        { validator: checkCode, trigger: ["blur"] }
    ]
});

// 登录
const handleLogin = () => {
    console.log(phoneForm);
}

// 获取验证码
const handleGetCode = async () => {
    try {
        showCountdown.value = true;
        // 正常开发只需要发送请求，后端会发送验证码到手机号，前端点登录时校验验证码是否正确
        // 这里为了方便演示，直接将验证码返回给前端，前端校验验证码是否正确
        const res = await reqSendSmsCode(phoneForm.phone);
        if (res.code === 200) {
            ElMessage.success("验证码发送成功");
            phoneForm.code = res.data;
        }
    } catch (error: any) {
        ElMessage.error(error.message);
    }
}

// 切换登录模式
const changeLoginMode = (mode: LoginModeType) => {
    loginMode.value = mode;
}

// 验证码倒计时结束
const handleCountdownFinish = () => {
    showCountdown.value = false;
}


</script>

<style lang="scss" scoped>
.login {
    :deep(.el-dialog__body) {
        border-top: 1px solid #eee;
    }

    .login-content {
        margin: 50px 0;
        padding: 20px;
        border: 1px solid #eee;
        border-radius: 5px;

        .phone-login {
            .code-input {

                :deep(.el-input-group__append) {
                    background-color: #fff;
                    color: #55a6fe;

                    &:hover {
                        background-color: #f9f9f9;
                    }
                }
            }
        }

        .login-btn {
            width: 100%;
        }

        .change-login-icon {
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
    }

}
</style>