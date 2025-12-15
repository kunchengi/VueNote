const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/sms/send/13800138000',
  method: 'GET'
};

const req = http.request(options, (res) => {
  console.log(`状态码: ${res.statusCode}`);
  console.log(`响应头: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  let rawData = '';
  res.on('data', (chunk) => {
    rawData += chunk;
  });
  res.on('end', () => {
    try {
      console.log(`响应体: ${rawData}`);
    } catch (e) {
      console.error(`解析错误: ${e.message}`);
    }
  });
});

req.on('error', (e) => {
  console.error(`请求错误: ${e.message}`);
});

req.end();
