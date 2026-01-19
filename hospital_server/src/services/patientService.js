const {
  Patient,
  memoryPatients
} = require('../models/patientModel');

// 保存（添加）就诊人信息
const savePatient = async (patientInfo, userId) => {
  try {
    // 优先使用MongoDB创建
    const patient = new Patient({
      ...patientInfo,
      userId,
      isDeleted: 0,
      createTime: new Date(),
      updateTime: new Date()
    });
    await patient.save();
    return patient;
  } catch (error) {
    console.error('Error saving patient in MongoDB:', error);
    // 后备：使用内存存储
    const id = `memory-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const memoryPatient = {
      ...patientInfo,
      id,
      userId,
      isDeleted: 0,
      createTime: new Date(),
      updateTime: new Date()
    };
    memoryPatients.set(id, memoryPatient);
    return memoryPatient;
  }
};

// 删除就诊人信息
const deletePatient = async (id, userId) => {
  try {
    // 优先使用MongoDB删除（软删除），但先检查id是否为有效的ObjectId
    if (isValidObjectId(id)) {
      const result = await Patient.updateOne({
        _id: id,
        userId,
        isDeleted: 0
      }, {
        $set: {
          isDeleted: 1,
          updateTime: new Date()
        }
      });
      if (result.modifiedCount > 0) {
        return true;
      }
    }
    // 后备：使用内存存储删除
    const patient = memoryPatients.get(id);
    if (patient && patient.userId === userId && patient.isDeleted === 0) {
      patient.isDeleted = 1;
      patient.updateTime = new Date();
      memoryPatients.set(id, patient);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error deleting patient in MongoDB:', error);
    // 发生错误时，使用内存存储作为后备
    const patient = memoryPatients.get(id);
    if (patient && patient.userId === userId && patient.isDeleted === 0) {
      patient.isDeleted = 1;
      patient.updateTime = new Date();
      memoryPatients.set(id, patient);
      return true;
    }
    return false;
  }
};

// 更新就诊人信息
const updatePatient = async (patientInfo, userId) => {
  const {
    id
  } = patientInfo;
  try {
    // 优先使用MongoDB更新，但先检查id是否为有效的ObjectId
    if (isValidObjectId(id)) {
      const result = await Patient.updateOne({
        _id: id,
        userId,
        isDeleted: 0
      }, {
        $set: {
          ...patientInfo,
          updateTime: new Date()
        }
      });
      if (result.modifiedCount > 0) {
        return true;
      }
    }
    // 后备：使用内存存储更新
    const patient = memoryPatients.get(id);
    if (patient && patient.userId === userId && patient.isDeleted === 0) {
      const updatedPatient = {
        ...patient,
        ...patientInfo,
        updateTime: new Date()
      };
      memoryPatients.set(id, updatedPatient);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error updating patient in MongoDB:', error);
    // 发生错误时，使用内存存储作为后备
    const patient = memoryPatients.get(id);
    if (patient && patient.userId === userId && patient.isDeleted === 0) {
      const updatedPatient = {
        ...patient,
        ...patientInfo,
        updateTime: new Date()
      };
      memoryPatients.set(id, updatedPatient);
      return true;
    }
    return false;
  }
};

// 检查是否为有效的ObjectId
const isValidObjectId = (id) => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};

// 获取就诊人信息
const getPatient = async (id, userId) => {
  try {
    console.log(`=== getPatient调用 ===`);
    console.log(`查询条件: _id=${id}, userId=${userId}`);

    // 优先使用MongoDB查询，但先检查id是否为有效的ObjectId
    if (isValidObjectId(id)) {
      const patient = await Patient.findOne({
        _id: id,
        userId,
        isDeleted: 0
      });
      console.log(`MongoDB查询结果: ${patient ? '找到' : '未找到'}`);

      if (patient) {
        return patient;
      }
    }
    // 后备：使用内存存储查询
    console.log(`内存存储中共有 ${memoryPatients.size} 条数据`);
    const memoryPatient = memoryPatients.get(id);
    console.log(`内存查询结果: ${memoryPatient ? '找到' : '未找到'}`);

    if (memoryPatient && memoryPatient.userId === userId && memoryPatient.isDeleted === 0) {
      return memoryPatient;
    }
    return null;
  } catch (error) {
    console.error('Error getting patient in MongoDB:', error);
    // 发生错误时，使用内存存储作为后备
    const memoryPatient = memoryPatients.get(id);
    if (memoryPatient && memoryPatient.userId === userId && memoryPatient.isDeleted === 0) {
      return memoryPatient;
    }
    return null;
  }
};

// 获取账号下的所有就诊人信息
const getAllPatients = async (userId) => {
  try {
    // 优先使用MongoDB查询
    const patients = await Patient.find({
      userId,
      isDeleted: 0
    });
    if (patients.length > 0) {
      return patients;
    }
    // 后备：使用内存存储查询
    const memoryPatientsArray = [];
    for (const patient of memoryPatients.values()) {
      if (patient.userId === userId && patient.isDeleted === 0) {
        memoryPatientsArray.push(patient);
      }
    }
    return memoryPatientsArray;
  } catch (error) {
    console.error('Error getting all patients in MongoDB:', error);
    // 发生错误时，使用内存存储作为后备
    const memoryPatientsArray = [];
    for (const patient of memoryPatients.values()) {
      if (patient.userId === userId && patient.isDeleted === 0) {
        memoryPatientsArray.push(patient);
      }
    }
    return memoryPatientsArray;
  }
};

module.exports = {
  savePatient,
  deletePatient,
  updatePatient,
  getPatient,
  getAllPatients
};
