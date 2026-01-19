const mongoose = require('mongoose');

// 就诊人模型
const patientSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    description: '用户ID，从token中获取'
  },
  name: {
    type: String,
    required: true,
    description: '就诊人姓名'
  },
  certificateType: {
    type: Number,
    required: true,
    description: '就诊人证件类型，0表示身份证，1表示护照'
  },
  certificateNumber: {
    type: String,
    required: true,
    description: '就诊人证件号码'
  },
  sex: {
    type: Number,
    required: true,
    description: '就诊人性别，0表示女，1表示男'
  },
  birthDay: {
    type: String,
    required: true,
    description: '就诊人出生日期，格式：yyyy-MM-dd'
  },
  phone: {
    type: String,
    required: true,
    description: '就诊人联系电话'
  },
  isMarry: {
    type: Number,
    required: true,
    description: '就诊人婚姻状态，0表示未婚，1表示已婚'
  },
  isInsurance: {
    type: Number,
    required: true,
    description: '就诊人是否有医保，0表示无医保，1表示有医保'
  },
  address: {
    type: String,
    required: true,
    description: '就诊人联系地址'
  },
  isDeleted: {
    type: Number,
    default: 0,
    description: '是否删除，0表示未删除，1表示已删除'
  },
  createTime: {
    type: Date,
    default: Date.now,
    description: '创建时间'
  },
  updateTime: {
    type: Date,
    default: Date.now,
    description: '更新时间'
  }
});

// 添加虚拟属性，将_id转换为id
patientSchema.virtual('id').get(function () {
  return this._id.toString();
});

// 确保虚拟属性在JSON序列化时包含在内
patientSchema.set('toJSON', {
  virtuals: true
});
patientSchema.set('toObject', {
  virtuals: true
});

// 定义模型
let Patient;
try {
  Patient = mongoose.model('Patient');
} catch (error) {
  Patient = mongoose.model('Patient', patientSchema);
}

// 内存存储的后备方案
const memoryPatients = new Map();

// 导出模型和内存存储
module.exports = {
  Patient,
  memoryPatients
};
