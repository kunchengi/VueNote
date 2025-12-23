const mongoose = require('mongoose');

// 用户模型
const userSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
    unique: true,
    match: /^1\d{10}$/
  },
  name: {
    type: String,
    required: true
  },
  wxGzhOpenId: {
    type: String,
    unique: true,
    sparse: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// 定义模型，支持mongoose连接和内存存储两种方式
let User;
try {
  User = mongoose.model('User');
} catch (error) {
  User = mongoose.model('User', userSchema);
}

// 内存存储的后备方案
const memoryUsers = new Map();

// 导出模型和内存存储
module.exports = {
  User,
  memoryUsers
};
