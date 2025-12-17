const express = require('express');
const path = require('path');
const config = require('./src/config/appConfig');
const { connectDB } = require('./src/config/dbConfig');

const app = express();
const PORT = config.port;

// 全局异常处理
process.on('uncaughtException', (error) => {
  console.error('全局未捕获异常:', error.message);
  // 不退出进程，让应用继续运行
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('全局未处理的 Promise 拒绝:', reason.message || reason);
  // 不退出进程，让应用继续运行
});

// 连接数据库
connectDB();

// 延迟初始化 Redis 连接，避免阻塞应用启动
setTimeout(() => {
  try {
    const { createRedisClient } = require('./src/config/redisConfig');
    createRedisClient();
  } catch (error) {
    console.error('初始化 Redis 连接失败:', error.message);
  }
}, 1000);

// 中间件配置
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 静态文件服务
app.use(express.static(path.join(__dirname, 'public')));

// API 路由配置

// 导入路由和控制器
const dictRoutes = require('./src/routes/dictRoutes');
const hospitalController = require('./src/controllers/hospitalController');
const smsController = require('./src/controllers/smsController');
const userController = require('./src/controllers/userController');

// 短信相关路由 - 放在医院通配符路由之前，避免冲突
app.get(`${config.baseApiPath}/sms/send/:phone`, smsController.sendSms);

// 医院相关路由 - 直接在index.js中定义，避免路由冲突

// 1. 根据医院名称模糊查找医院列表
app.get(`${config.baseApiPath}/hosp/hospital/findByHosname/:hosname`, hospitalController.findByHosname);

// 2. 根据医院编码获取科室信息
app.get(`${config.baseApiPath}/hosp/hospital/department/:hoscode`, hospitalController.getDepartmentByHoscode);

// 3. 根据医院编码获取医院详情
app.get(`${config.baseApiPath}/hosp/hospital/:hoscode`, hospitalController.getHospitalByHoscode);

// 4. 旧版分页获取医院列表
app.get(`${config.baseApiPath}/hosp/hospital/:page/:limit`, hospitalController.getHospitalList);

// 字典相关路由
app.use(`${config.baseApiPath}/cmn/dict`, dictRoutes);

// 5. 通过文件名获取文件内容
app.get(`${config.baseApiPath}/hosp/article/:filename`, hospitalController.getArticleByFilename);

// 用户相关路由
app.post(`${config.baseApiPath}/user/login`, userController.login);

// 404 处理
app.use((req, res) => {
  res.status(404).json({
    code: 404,
    success: false,
    message: '接口不存在'
  });
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    code: 500,
    success: false,
    message: '服务器内部错误',
    error: err.message
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`\n🚀 服务器正在运行 在 http://localhost:${PORT}`);
  console.log(`📝 API 基地址: ${config.baseApiPath}`);

  console.log(`📚 医院 API: http://localhost:${PORT}${config.baseApiPath}/hosp/hospital/:page/:limit`);
  console.log(`📚 医院详情 API: http://localhost:${PORT}${config.baseApiPath}/hosp/hospital/:hoscode`);
  console.log(`📚 目录 API: http://localhost:${PORT}${config.baseApiPath}/cmn/dict/findByDictCode/:dictCode`);
  console.log(`📚 医院名称模糊查找 API: http://localhost:${PORT}${config.baseApiPath}/hosp/hospital/findByHosname/:hosname`);
  console.log(`📚 通过文件名获取文件内容 API: http://localhost:${PORT}${config.baseApiPath}/hosp/article/:filename`);
  console.log(`📚 医院科室 API: http://localhost:${PORT}${config.baseApiPath}/hosp/hospital/department/:hoscode`);
  console.log(`📚 发送短信验证码 API: http://localhost:${PORT}${config.baseApiPath}/sms/send/:phone`);
  console.log(`📚 用户登录 API: http://localhost:${PORT}${config.baseApiPath}/user/login`);
  
  console.log('\nPress Ctrl+C to stop the server\n');
});
