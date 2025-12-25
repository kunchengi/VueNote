const mongoose = require('mongoose');
const BookingSchedule = require('./src/models/bookingScheduleModel');

// MongoDB 连接配置
const mongoURI = 'mongodb://localhost:27017/hospital_system';

async function clearBookingschedules() {
  try {
    // 连接到MongoDB
    console.log('正在连接到MongoDB...');
    await mongoose.connect(mongoURI);
    console.log('MongoDB 连接成功');
    
    // 清空bookingschedules表
    console.log('正在清空bookingschedules表...');
    const result = await BookingSchedule.deleteMany({});
    console.log(`成功清空bookingschedules表，共删除 ${result.deletedCount} 条记录`);
    
    // 断开数据库连接
    await mongoose.disconnect();
    console.log('MongoDB 连接已断开');
    
    process.exit(0);
  } catch (error) {
    console.error('清空bookingschedules表失败:', error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
}

// 执行脚本
clearBookingschedules();