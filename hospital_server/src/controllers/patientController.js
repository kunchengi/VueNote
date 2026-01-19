const {
  successResponse,
  errorResponse
} = require('../utils/responseUtils');
const {
  savePatient,
  deletePatient,
  updatePatient,
  getPatient,
  getAllPatients
} = require('../services/patientService');

// 保存（添加）就诊人信息
const savePatientInfo = async (req, res) => {
  try {
    // 获取请求体参数
    const patientInfo = req.body;
    // 从token中获取用户信息（使用phone作为userId）
    const userId = req.user.phone;

    // 验证参数
    if (!patientInfo.name || patientInfo.certificateType === undefined || !patientInfo.certificateNumber ||
      patientInfo.sex === undefined || !patientInfo.birthDay || !patientInfo.phone ||
      patientInfo.isMarry === undefined || patientInfo.isInsurance === undefined ||
      !patientInfo.address) {
      return errorResponse(res, 400, '请填写完整的就诊人信息');
    }

    // 验证证件类型值只能是0或1
    if (patientInfo.certificateType !== 0 && patientInfo.certificateType !== 1) {
      return errorResponse(res, 400, '证件类型值只能是0（身份证）或1（护照）');
    }

    // 验证性别值只能是0或1
    if (patientInfo.sex !== 0 && patientInfo.sex !== 1) {
      return errorResponse(res, 400, '性别值只能是0（女）或1（男）');
    }

    // 验证婚姻状态值只能是0或1
    if (patientInfo.isMarry !== 0 && patientInfo.isMarry !== 1) {
      return errorResponse(res, 400, '婚姻状态值只能是0（未婚）或1（已婚）');
    }

    // 验证医保状态值只能是0或1
    if (patientInfo.isInsurance !== 0 && patientInfo.isInsurance !== 1) {
      return errorResponse(res, 400, '医保状态值只能是0（无医保）或1（有医保）');
    }

    // 保存就诊人信息
    await savePatient(patientInfo, userId);

    // 返回成功响应
    return successResponse(res, null, '添加就诊人信息成功');
  } catch (error) {
    console.error('Error saving patient info:', error);
    return errorResponse(res, 400, '添加就诊人失败');
  }
};

// 删除就诊人信息
const deletePatientInfo = async (req, res) => {
  try {
    // 获取路径参数
    const {
      id
    } = req.params;
    // 从token中获取用户信息（使用phone作为userId）
    const userId = req.user.phone;

    // 验证参数
    if (!id) {
      return errorResponse(res, 400, '就诊人ID不能为空');
    }

    // 删除就诊人信息
    const result = await deletePatient(id, userId);

    if (result) {
      // 返回成功响应
      return successResponse(res, null, '删除就诊人信息成功');
    } else {
      // 返回失败响应
      return errorResponse(res, 400, '删除就诊人失败');
    }
  } catch (error) {
    console.error('Error deleting patient info:', error);
    return errorResponse(res, 400, '删除就诊人失败');
  }
};

// 更新就诊人信息
const updatePatientInfo = async (req, res) => {
  try {
    // 获取请求体参数
    const patientInfo = req.body;
    // 从token中获取用户信息（使用phone作为userId）
    const userId = req.user.phone;

    // 验证参数
    if (!patientInfo.id || !patientInfo.name || patientInfo.certificateType === undefined || !patientInfo.certificateNumber ||
      patientInfo.sex === undefined || !patientInfo.birthDay || !patientInfo.phone ||
      patientInfo.isMarry === undefined || patientInfo.isInsurance === undefined ||
      !patientInfo.address) {
      return errorResponse(res, 400, '请填写完整的就诊人信息');
    }

    // 验证证件类型值只能是0或1
    if (patientInfo.certificateType !== 0 && patientInfo.certificateType !== 1) {
      return errorResponse(res, 400, '证件类型值只能是0（身份证）或1（护照）');
    }

    // 验证性别值只能是0或1
    if (patientInfo.sex !== 0 && patientInfo.sex !== 1) {
      return errorResponse(res, 400, '性别值只能是0（女）或1（男）');
    }

    // 验证婚姻状态值只能是0或1
    if (patientInfo.isMarry !== 0 && patientInfo.isMarry !== 1) {
      return errorResponse(res, 400, '婚姻状态值只能是0（未婚）或1（已婚）');
    }

    // 验证医保状态值只能是0或1
    if (patientInfo.isInsurance !== 0 && patientInfo.isInsurance !== 1) {
      return errorResponse(res, 400, '医保状态值只能是0（无医保）或1（有医保）');
    }

    // 更新就诊人信息
    const result = await updatePatient(patientInfo, userId);

    if (result) {
      // 返回成功响应
      return successResponse(res, null, '更新就诊人信息成功');
    } else {
      // 返回失败响应
      return errorResponse(res, 400, '更新就诊人失败');
    }
  } catch (error) {
    console.error('Error updating patient info:', error);
    return errorResponse(res, 400, '更新就诊人失败');
  }
};

// 获取就诊人信息
const getPatientInfo = async (req, res) => {
  try {
    // 获取路径参数
    const {
      id
    } = req.params;
    // 从token中获取用户信息（使用phone作为userId）
    const userId = req.user.phone;

    // 验证参数
    if (!id) {
      return errorResponse(res, 400, '就诊人ID不能为空');
    }

    // 获取就诊人信息
    const patient = await getPatient(id, userId);

    if (patient) {
      // 返回成功响应
      return successResponse(res, patient, '获取就诊人信息成功');
    } else {
      // 返回失败响应
      return errorResponse(res, 400, '获取就诊人信息失败');
    }
  } catch (error) {
    console.error('Error getting patient info:', error);
    return errorResponse(res, 400, '获取就诊人信息失败');
  }
};

// 获取账号下的所有就诊人信息
const getAllPatientInfo = async (req, res) => {
  try {
    // 从token中获取用户信息（使用phone作为userId）
    const userId = req.user.phone;

    // 获取所有就诊人信息
    const patients = await getAllPatients(userId);

    // 返回成功响应
    return successResponse(res, patients, '获取就诊人列表成功');
  } catch (error) {
    console.error('Error getting all patient info:', error);
    return errorResponse(res, 400, '获取就诊人列表失败');
  }
};

module.exports = {
  savePatientInfo,
  deletePatientInfo,
  updatePatientInfo,
  getPatientInfo,
  getAllPatientInfo
};
