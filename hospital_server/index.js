const express = require('express');
const path = require('path');
const config = require('./src/config/appConfig');

const app = express();
const PORT = config.port;

// 中间件配置
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 静态文件服务
app.use(express.static(path.join(__dirname, 'public')));

// API 路由配置

// 导入路由和控制器
const dictRoutes = require('./src/routes/dictRoutes');
const hospitalController = require('./src/controllers/hospitalController');

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
  
  console.log('\nPress Ctrl+C to stop the server\n');
});
