const http = require('http');
const { spawn } = require('child_process');

// 启动服务器
const serverProcess = spawn('node', ['index.js'], {
  cwd: __dirname,
  stdio: 'inherit'
});

// 等待服务器启动
setTimeout(() => {
  console.log('Testing SMS API...');
  
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/sms/send/13800138000',
    method: 'GET'
  };
  
  const req = http.request(options, (res) => {
    let rawData = '';
    res.on('data', (chunk) => {
      rawData += chunk;
    });
    res.on('end', () => {
      console.log(`Status Code: ${res.statusCode}`);
      console.log(`Response: ${rawData}`);
      
      // 关闭服务器
      serverProcess.kill();
    });
  });
  
  req.on('error', (e) => {
    console.error(`Request Error: ${e.message}`);
    serverProcess.kill();
  });
  
  req.end();
}, 2000);

// 捕获服务器进程的错误
serverProcess.on('error', (error) => {
  console.error(`Server Error: ${error}`);
});

// 服务器进程退出时的处理
serverProcess.on('exit', (code) => {
  console.log(`Server exited with code ${code}`);
});
