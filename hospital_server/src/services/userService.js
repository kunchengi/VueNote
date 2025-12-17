const { User, memoryUsers } = require('../models/userModel');
const jwt = require('jsonwebtoken');

// JWT 密钥，生产环境建议使用环境变量
const JWT_SECRET = 'your-secret-key-change-in-production';

// 检查用户是否存在
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
    console.error('Error finding user:', error);
    // 发生错误时，使用内存存储作为后备
    return memoryUsers.get(phone) || null;
  }
};

// 创建新用户
const createUser = async (phone) => {
  // 生成随机用户编号（4位）
  const randomId = Math.floor(1000 + Math.random() * 9000).toString();
  const name = `用户${randomId}`;
  
  try {
    // 优先使用MongoDB创建
    const user = new User({
      phone,
      name
    });
    await user.save();
    return user;
  } catch (error) {
    console.error('Error creating user in MongoDB:', error);
    // 后备：使用内存存储
    const memoryUser = {
      phone,
      name,
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
  createUser,
  generateToken
};
