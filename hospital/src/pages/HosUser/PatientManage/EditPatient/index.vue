<template>
    <el-card header="添加就诊人">
        <div class="add-patient">
            <el-form :model="patientInfo" label-width="auto" style="width: 600px" ref="ruleFormRef" :rules="rules">
                <el-form-item label="患者姓名" prop="name">
                    <el-input v-model="patientInfo.name" placeholder="请输入患者姓名" />
                </el-form-item>
                <el-form-item label="证件类型" prop="certificateType">
                    <el-select v-model="patientInfo.certificateType">
                        <el-option v-for="(type, key) in CERTIFICATE_TYPES" :key="key" :label="type" :value="key" />
                    </el-select>
                </el-form-item>
                <el-form-item label="证件号码" prop="certificateNumber">
                    <el-input v-model="patientInfo.certificateNumber" placeholder="请输入证件号码" />
                </el-form-item>
                <el-form-item label="患者性别" prop="sex">
                    <el-radio-group v-model="patientInfo.sex">
                        <el-radio v-for="(sex, key) in SEXES" :key="key" :label="sex"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="出生日期" prop="birthDay">
                    <el-date-picker v-model="patientInfo.birthDay" type="date" value-format="yyyy-MM-dd"
                        placeholder="选择出生日期" />
                </el-form-item>
                <el-form-item label="联系电话" prop="phone">
                    <el-input v-model="patientInfo.phone" placeholder="请输入联系电话" />
                </el-form-item>
                <el-form-item label="婚姻状况" prop="maritalStatus">
                    <el-radio-group v-model="patientInfo.maritalStatus">
                        <el-radio v-for="(status, key) in MARITAL_STATUSES" :key="key" :label="status"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="自费/医保" prop="isMedicalInsurance">
                    <el-radio-group v-model="patientInfo.isMedicalInsurance">
                        <el-radio label="自费" :value="false"></el-radio>
                        <el-radio label="医保" :value="true"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="联系地址" prop="address">
                    <el-input v-model="patientInfo.address" placeholder="省/市/区/街道/门牌号" />
                </el-form-item>
                <div class="form-buttons">
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit(ruleFormRef)">提交</el-button>
                        <el-button @click="resetForm(ruleFormRef)">重写</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </div>
    </el-card>
</template>

<script setup lang="ts" name="EditPatient">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

// 证件类型
const CERTIFICATE_TYPES = {
    ID_CARD: '身份证',
    PASSPORT: '护照',
}

const SEXES = {
    MALE: '男',
    FEMALE: '女',
}

// 婚姻状态
const MARITAL_STATUSES = {
    SINGLE: '未婚',
    MARRIED: '已婚',
}

// 表单实例
const ruleFormRef = ref<FormInstance>()

// 患者信息接口
interface PatientInfo {
    name: string
    certificateType: string
    certificateNumber: string
    sex: string
    birthDay: string
    phone: string
    maritalStatus: string
    isMedicalInsurance: boolean
    address: string
}

// 患者信息
const patientInfo = reactive<PatientInfo>({
    name: '',
    certificateType: CERTIFICATE_TYPES.ID_CARD,
    certificateNumber: '',
    sex: SEXES.MALE,
    birthDay: '',
    phone: '',
    maritalStatus: MARITAL_STATUSES.SINGLE,
    isMedicalInsurance: false,
    address: '',
})

// 校验证件号码是否合法
const validateCertificateNumber = (rule: any, value: string, callback: any) => {
    if (patientInfo.certificateType === CERTIFICATE_TYPES.ID_CARD) {
        if (!isLegalIdCard(value)) {
            callback(new Error("请输入正确的身份证号码"));
        } else {
            callback();
        }
    } else if (patientInfo.certificateType === CERTIFICATE_TYPES.PASSPORT) {
        if (!isLegalPassport(value)) {
            callback(new Error("请输入正确的护照号码"));
        } else {
            callback();
        }
    } else {
        callback(new Error("请选择证件类型"));
    }
}

// 身份证号是否合法
const isLegalIdCard = (idCard: string) => {
    const idCardStr = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    return idCardStr.test(idCard);
}

// 护照号是否合法
const isLegalPassport = (passport: string) => {
    const passportStr = /^[A-Za-z0-9]{7,10}$/;
    return passportStr.test(passport);
}

// 校验手机号是否合法
const checkPhone = (rule: any, value: string, callback: any) => {
    return isLegalPhone(value) ? callback() : callback(new Error("请输入正确的手机号"));
}

// 手机号是否合法
const isLegalPhone = (phone: string) => {
    const telStr = /^[1](([3][0-9])|([4][0,1,4-9])|([5][0-3,5-9])|([6][2,5,6,7])|([7][0-8])|([8][0-9])|([9][0-3,5-9]))[0-9]{8}$/;
    return telStr.test(phone);
}

// 表单验证规则
const rules = reactive<FormRules<PatientInfo>>({
    name: [{ required: true, message: '请输入患者姓名', trigger: 'blur' }],
    certificateType: [{ required: true, message: '请选择证件类型', trigger: 'change' }],
    certificateNumber: [{ required: true, validator: validateCertificateNumber, trigger: 'blur' }],
    sex: [{ required: true, message: '请选择患者性别', trigger: 'change' }],
    birthDay: [{ required: true, message: '请选择出生日期', trigger: 'change' }],
    phone: [{ required: true, validator: checkPhone, trigger: 'blur' }],
    maritalStatus: [{ required: true, message: '请选择婚姻状况', trigger: 'change' }],
    isMedicalInsurance: [{ required: true, message: '请选择自费/医保', trigger: 'change' }],
    address: [{ required: true, message: '请输入联系地址', trigger: 'blur' }],
})

// 提交表单
const onSubmit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('验证通过', patientInfo)
        } else {
            console.log('验证失败', patientInfo)
        }
    })
}

// 重置表单
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
</script>

<style lang="scss" scoped>
.add-patient {
    width: 100%;
    margin: 20px 0;
    display: flex;
    justify-content: center;

    .form-buttons {
        display: flex;
        justify-content: center;
    }
}
</style>