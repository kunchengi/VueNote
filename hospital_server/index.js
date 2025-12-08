const express = require('express');
const path = require('path');
const config = require('./src/config/appConfig');
const hospitalRoutes = require('./src/routes/hospitalRoutes');
const dictRoutes = require('./src/routes/dictRoutes');

const app = express();
const PORT = config.port;

// 中间件配置
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 静态文件服务
app.use(express.static(path.join(__dirname, 'public')));

// API 路由配置
app.use(`${config.baseApiPath}/hosp/hospital`, hospitalRoutes);
app.use(`${config.baseApiPath}/cmn/dict`, dictRoutes);



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
  console.log(`📚 目录 API: http://localhost:${PORT}${config.baseApiPath}/cmn/dict/findByDictCode/:dictCode`);

  console.log('\nPress Ctrl+C to stop the server\n');
});
