const { User, memoryUsers } = require('../models/userModel');
const jwt = require('jsonwebtoken');

// JWT 密钥，生产环境建议使用环境变量
const JWT_SECRET = 'your-secret-key-change-in-production';

// 检查用户是否存在（通过手机号）
const findUserByPhone = async (phone) => {
  try {
    // 优先使用MongoDB查询
    const user = await User.findOne({ phone });
    if (user) {
      return user;
    }
    // 后备：使用内存存储查询
    return memoryUsers.get(phone) || null;
  } catch (error) {
    console.error('Error finding user by phone:', error);
    // 发生错误时，使用内存存储作为后备
    return memoryUsers.get(phone) || null;
  }
};

// 检查用户是否存在（通过微信公众号OpenId）
const findUserByWxGzhOpenId = async (wxGzhOpenId) => {
  try {
    // 优先使用MongoDB查询
    const user = await User.findOne({ wxGzhOpenId });
    if (user) {
      return user;
    }
    // 后备：使用内存存储查询
    for (const user of memoryUsers.values()) {
      if (user.wxGzhOpenId === wxGzhOpenId) {
        return user;
      }
    }
    return null;
  } catch (error) {
    console.error('Error finding user by wxGzhOpenId:', error);
    // 发生错误时，使用内存存储作为后备
    for (const user of memoryUsers.values()) {
      if (user.wxGzhOpenId === wxGzhOpenId) {
        return user;
      }
    }
    return null;
  }
};

// 创建新用户
const createUser = async (phone, name = null, wxGzhOpenId = null) => {
  // 如果没有提供名称，生成随机用户编号（4位）
  const finalName = name || `用户${Math.floor(1000 + Math.random() * 9000).toString()}`;
  
  try {
    // 优先使用MongoDB创建
    const user = new User({
      phone,
      name: finalName,
      wxGzhOpenId
    });
    await user.save();
    return user;
  } catch (error) {
    console.error('Error creating user in MongoDB:', error);
    // 后备：使用内存存储
    const memoryUser = {
      phone,
      name: finalName,
      wxGzhOpenId,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    memoryUsers.set(phone, memoryUser);
    return memoryUser;
  }
};

// 生成JWT token
const generateToken = (phone, name) => {
  return jwt.sign(
    { phone, name },
    JWT_SECRET,
    { expiresIn: '7d' } // 7天过期
  );
};

module.exports = {
  findUserByPhone,
  findUserByWxGzhOpenId,
  createUser,
  generateToken
};
