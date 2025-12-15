const express = require('express');

const app = express();
const PORT = 3000;

// 简单的测试路由
app.get('/test', (req, res) => {
  res.send('Test route works!');
});

app.get('/api/sms/send/:phone', (req, res) => {
  res.json({
    code: 200,
    success: true,
    data: '123456',
    message: '获取验证码成功'
  });
});

// 404处理
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Testing /test route...');
  
  const http = require('http');
  
  // 测试/test路由
  const testOptions = {
    hostname: 'localhost',
    port: PORT,
    path: '/test',
    method: 'GET'
  };
  
  http.request(testOptions, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
      console.log(`/test response: ${data}`);
      
      // 测试SMS路由
      console.log('Testing /api/sms/send/13800138000 route...');
      const smsOptions = {
        hostname: 'localhost',
        port: PORT,
        path: '/api/sms/send/13800138000',
        method: 'GET'
      };
      
      http.request(smsOptions, (res) => {
        let smsData = '';
        res.on('data', (chunk) => smsData += chunk);
        res.on('end', () => {
          console.log(`/api/sms/send/13800138000 response: ${smsData}`);
          process.exit(0);
        });
      }).end();
    });
  }).end();
});
