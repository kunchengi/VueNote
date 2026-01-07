const http = require('http');

// 测试获取科室对应日期的医生排班信息
async function testFindScheduleList() {
  console.log('=== 测试获取科室对应日期的医生排班信息 ===\n');
  
  // 1. 先登录获取token
  console.log('1. 登录获取token...');
  const token = await loginAndGetToken();
  if (!token) {
    console.error('登录失败，无法继续测试');
    return;
  }
  console.log(`登录成功，获取到token: ${token.substring(0, 20)}...\n`);
  
  // 2. 测试正常情况 - 获取排班信息
  console.log('2. 测试正常情况 - 获取排班信息...');
  await testFindScheduleListWithToken(token, '1000_10', '100101', '2025-12-24');
  
  // 3. 测试参数缺失 - 缺少workDate
  console.log('\n3. 测试参数缺失 - 缺少workDate...');
  await testFindScheduleListWithToken(token, '1000_10', '100101', null);
  
  // 4. 测试医院不存在
  console.log('\n4. 测试医院不存在...');
  await testFindScheduleListWithToken(token, '999999', '100101', '2025-12-24');
  
  // 5. 测试不同日期的排班信息
  console.log('\n5. 测试不同日期的排班信息...');
  await testFindScheduleListWithToken(token, '1000_10', '100101', '2025-12-25');
  
  console.log('\n=== 所有测试完成 ===');
}

// 登录获取token
async function loginAndGetToken() {
  const phone = '13800138000';
  
  // 发送验证码
  console.log('  发送验证码...');
  const code = await sendSms(phone);
  if (!code) {
    console.error('  获取验证码失败');
    return null;
  }
  console.log(`  获取到验证码: ${code}`);
  
  // 使用验证码登录
  console.log('  使用验证码登录...');
  const loginResult = await login(phone, code);
  if (loginResult.success) {
    console.log('  登录成功!');
    return loginResult.data.token;
  } else {
    console.error('  登录失败:', loginResult.message);
    return null;
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

// 获取排班信息
function findScheduleList(token, hoscode, depcode, workDate) {
  return new Promise((resolve, reject) => {
    let path = `/api/hosp/hospital/auth/findScheduleList?hoscode=${hoscode}&depcode=${depcode}`;
    if (workDate) {
      path += `&workDate=${workDate}`;
    }
    
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: 'GET',
      headers: {
        'token': token
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
          resolve({ statusCode: res.statusCode, result });
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

// 测试获取排班信息
async function testFindScheduleListWithToken(token, hoscode, depcode, workDate) {
  try {
    const { statusCode, result } = await findScheduleList(token, hoscode, depcode, workDate);
    
    if (result.success) {
      console.log(`✅ 请求成功 (状态码: ${statusCode})`);
      console.log(`   找到 ${result.data.length} 个医生`);
      
      if (result.data.length > 0) {
        const firstDoctor = result.data[0];
        console.log(`   第一个医生信息:`);
        console.log(`     - 医生姓名: ${firstDoctor.docName}`);
        console.log(`     - 医生等级: ${firstDoctor.level}`);
        console.log(`     - 科室名称: ${firstDoctor.param.depname}`);
        console.log(`     - 医院名称: ${firstDoctor.param.hosname}`);
        console.log(`     - 工作日期: ${firstDoctor.workDate}`);
        console.log(`     - 工作时间: ${firstDoctor.workTime === 0 ? '上午' : '下午'}`);
        console.log(`     - 挂号费用: ${firstDoctor.amount}元`);
        console.log(`     - 可预约人数: ${firstDoctor.availableNumber}人`);
      }
    } else {
      console.log(`❌ 请求失败 (状态码: ${statusCode})`);
      console.log(`   错误信息: ${result.message}`);
    }
  } catch (error) {
    console.error(`❌ 请求异常: ${error.message}`);
  }
}

// 运行测试
testFindScheduleList().catch(console.error);
