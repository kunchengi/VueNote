const express = require('express');

const app = express();
const PORT = 3000;
const baseApiPath = '/api';

// 添加全局请求日志中间件
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// 简单的测试路由 - 不使用动态参数
app.get(`${baseApiPath}/sms/send/13800138000`, (req, res) => {
  console.log(`SMS route matched for: 13800138000`);
  res.json({
    code: 200,
    success: true,
    data: '123456',
    message: '获取验证码成功'
  });
});

// 使用动态参数的路由
app.get(`${baseApiPath}/sms/send/:phone`, (req, res) => {
  console.log(`SMS route matched for dynamic param: ${req.params.phone}`);
  res.json({
    code: 200,
    success: true,
    data: '654321',
    message: '获取验证码成功'
  });
});

// 404 处理
app.use((req, res) => {
  console.log(`404 for: ${req.originalUrl}`);
  res.status(404).json({
    code: 404,
    success: false,
    message: '接口不存在'
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Testing route: ${baseApiPath}/sms/send/13800138000`);
  
  // 延迟1秒后测试，确保服务器完全启动
  setTimeout(() => {
    console.log('Performing test...');
    const http = require('http');
    const options = {
      hostname: 'localhost',
      port: PORT,
      path: `${baseApiPath}/sms/send/13800138000`,
      method: 'GET'
    };
    
    const req = http.request(options, (res) => {
      let rawData = '';
      res.on('data', (chunk) => {
        rawData += chunk;
      });
      res.on('end', () => {
        console.log(`Test Response: ${rawData}`);
        process.exit(0);
      });
    });
    
    req.on('error', (e) => {
      console.error(`Test Error: ${e.message}`);
      process.exit(1);
    });
    
    req.end();
  }, 1000);
});
