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
                            <svg t="1765721017970" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="4710" width="32" height="32">
                                <path
                                    d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z"
                                    fill="#28C445" p-id="4711"></path>
                                <path
                                    d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z"
                                    fill="#28C445" p-id="4712"></path>
                            </svg>
                        </div>

                    </el-form>
                </div>
                <div class="wechat-login" v-else>
                    <div class="change-login-icon" @click="changeLoginMode(LoginMode.PHONE)">
                        <svg t="1765723375715" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="2301" width="32" height="32">
                            <path
                                d="M736 64H288a71.76 71.76 0 0 0-71.68 71.68v752.64A71.76 71.76 0 0 0 288 960h448a71.76 71.76 0 0 0 71.68-71.68V135.68A71.76 71.76 0 0 0 736 64zM512 879.36a35.84 35.84 0 1 1 35.84-35.84A35.84 35.84 0 0 1 512 879.36z m233-116.48H279V189.44h466z"
                                fill="#22B573" p-id="2302"></path>
                        </svg>
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

            .icon {
                cursor: pointer;
            }
        }
    }

}
</style>