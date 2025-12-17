const mongoose = require('mongoose');

// MongoDB 连接配置
const connectDB = async () => {
  try {
    // 使用 mongoose 连接本地 MongoDB（新版本mongoose不需要useNewUrlParser和useUnifiedTopology选项）
    const conn = await mongoose.connect('mongodb://localhost:27017/hospital_system');
    
    console.log(`MongoDB 连接成功: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`MongoDB 连接失败: ${error.message}`);
    // 如果连接失败，使用内存存储作为后备方案
    console.log('使用内存存储作为后备方案');
    return null;
  }
};

module.exports = {
  connectDB
};
