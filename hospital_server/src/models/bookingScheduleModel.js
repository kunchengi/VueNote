const mongoose = require('mongoose');

// 预约挂号模型Schema
const BookingScheduleSchema = new mongoose.Schema({
  // 医院编码
  hoscode: {
    type: String,
    required: true
  },
  // 科室编码
  depcode: {
    type: String,
    required: true
  },
  // 预约日期
  workDate: {
    type: String,
    required: true
  },
  // 医生数量
  docCount: {
    type: Number,
    default: 3
  },
  // 已预约人数
  reservedNumber: {
    type: Number,
    default: 0
  },
  // 可预约人数
  availableNumber: {
    type: Number,
    default: 10
  },
  // 预约状态，-1表示停止预约，0表示可预约
  status: {
    type: Number,
    default: 0
  },
  // 创建时间
  createdAt: {
    type: Date,
    default: Date.now
  },
  // 更新时间
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// 确保id字段在输出中包含
BookingScheduleSchema.set('toJSON', {
  versionKey: false,
  transform: function(doc, ret) {
    // 将_id转换为id
    ret.id = ret._id.toString();
    delete ret._id;
  }
});

// 设置索引，提高查询效率
BookingScheduleSchema.index({ hoscode: 1, depcode: 1, workDate: 1 }, { unique: true });

// 模型定义
const BookingSchedule = mongoose.model('BookingSchedule', BookingScheduleSchema);

module.exports = BookingSchedule;