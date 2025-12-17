const http = require('http');

// 测试登录流程
async function testLogin() {
  const phone = '13800138000';
  
  console.log('=== 测试登录流程 ===');
  
  // 1. 发送验证码
  console.log('1. 发送验证码...');
  const code = await sendSms(phone);
  if (!code) {
    console.error('获取验证码失败');
    return;
  }
  console.log(`获取到验证码: ${code}`);
  
  // 2. 使用验证码登录
  console.log('2. 使用验证码登录...');
  const loginResult = await login(phone, code);
  if (loginResult.success) {
    console.log('登录成功!');
    console.log('返回数据:', loginResult.data);
  } else {
    console.error('登录失败:', loginResult.message);
  }
}

// 发送验证码
function sendSms(phone) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: `/api/sms/send/${phone}`,
      method: 'GET'
    };
    
    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          if (result.success) {
            resolve(result.data);
          } else {
            resolve(null);
          }
        } catch (error) {
          reject(error);
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.end();
  });
}

// 登录
function login(phone, code) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({ phone, code });
    
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/user/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };
    
    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.write(postData);
    req.end();
  });
}

// 运行测试
testLogin().catch(console.error);
