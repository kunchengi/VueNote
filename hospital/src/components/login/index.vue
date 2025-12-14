<template>
    <div class="login">
        <el-dialog v-model="uiManageStore.showLogin" title="登录" width="400">
            <div class="login-content">
                <div class="phone-login" v-if="loginMode === LoginMode.PHONE">
                    <el-form>
                        <el-form-item>
                            <el-input v-model="form.mobile" placeholder="请输入手机号" :prefix-icon="Iphone"></el-input>
                        </el-form-item>
                        <el-form-item class="code-input">
                            <el-input v-model="form.code" placeholder="请输入验证码" :prefix-icon="Lock">
                                <template #append>
                                    <el-button @click="handleGetCode">获取验证码</el-button>
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
import { reactive, ref } from "vue";
import { Iphone, Lock } from "@element-plus/icons-vue";
import useUiManageStore from "@/store/modules/uiManage";

const uiManageStore = useUiManageStore();

// 登录模式
const LoginMode = {
    PHONE: "phone",
    WECHAT: "wechat"
}

type LoginModeType = (typeof LoginMode)[keyof typeof LoginMode];

// 当前登录模式
const loginMode = ref(LoginMode.PHONE);

const form = reactive({
    mobile: "",
    code: ""
});

// 登录
const handleLogin = () => {
    console.log(form);
}

// 获取验证码
const handleGetCode = () => {
    console.log(form.mobile);
}

// 切换登录模式
const changeLoginMode = (mode: LoginModeType) => {
    loginMode.value = mode;
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