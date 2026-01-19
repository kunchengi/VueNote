const http = require('http');

// 测试就诊人相关接口
async function testPatientApi() {
  const phone = '13800138000';
  let token = '';
  let patientId = '';

  console.log('=== 测试就诊人相关接口 ===');

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
    token = loginResult.data.token;
    console.log(`获取到token: ${token.substring(0, 20)}...`);
  } else {
    console.error('登录失败:', loginResult.message);
    return;
  }

  // 3. 保存就诊人信息
  console.log('3. 保存就诊人信息...');
  const saveResult = await savePatient(token);
  if (saveResult.success) {
    console.log('保存就诊人信息成功!');
  } else {
    console.error('保存就诊人信息失败:', saveResult.message);
  }

  // 4. 获取所有就诊人信息
  console.log('4. 获取所有就诊人信息...');
  const getAllResult = await getAllPatients(token);
  if (getAllResult.success) {
    console.log('获取所有就诊人信息成功!');
    console.log(`共获取到 ${getAllResult.data.length} 条就诊人信息`);
    if (getAllResult.data.length > 0) {
      patientId = getAllResult.data[0].id;
      console.log(`使用第一条就诊人ID: ${patientId} 进行后续测试`);
    }
  } else {
    console.error('获取所有就诊人信息失败:', getAllResult.message);
  }

  // 5. 获取单个就诊人信息
  if (patientId) {
    console.log('5. 获取单个就诊人信息...');
    const getOneResult = await getPatient(token, patientId);
    if (getOneResult.success) {
      console.log('获取单个就诊人信息成功!');
      console.log('就诊人信息:', getOneResult.data);
    } else {
      console.error('获取单个就诊人信息失败:', getOneResult.message);
    }
  }

  // 6. 更新就诊人信息
  if (patientId) {
    console.log('6. 更新就诊人信息...');
    const updateResult = await updatePatient(token, patientId);
    if (updateResult.success) {
      console.log('更新就诊人信息成功!');
    } else {
      console.error('更新就诊人信息失败:', updateResult.message);
    }
  }

  // 7. 删除就诊人信息
  if (patientId) {
    console.log('7. 删除就诊人信息...');
    const deleteResult = await deletePatient(token, patientId);
    if (deleteResult.success) {
      console.log('删除就诊人信息成功!');
    } else {
      console.error('删除就诊人信息失败:', deleteResult.message);
    }
  }

  console.log('=== 就诊人相关接口测试完成 ===');
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
    const postData = JSON.stringify({
      phone,
      code
    });

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

// 保存就诊人信息
function savePatient(token) {
  return new Promise((resolve, reject) => {
    const patientInfo = {
      name: '张三',
      certificateType: 0,
      certificateNumber: '44030419900101001X',
      sex: 1,
      birthDay: '1990-01-01',
      phone: '13800138000',
      isMarry: 0,
      isInsurance: 1,
      address: '北京市海淀区'
    };

    const postData = JSON.stringify(patientInfo);

    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/user/patient/auth/save',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
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

// 获取所有就诊人信息
function getAllPatients(token) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/user/patient/auth/findAll',
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
          resolve(result);
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

// 获取单个就诊人信息
function getPatient(token, id) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: `/api/user/patient/auth/${id}`,
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
          resolve(result);
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

// 更新就诊人信息
function updatePatient(token, id) {
  return new Promise((resolve, reject) => {
    const patientInfo = {
      id: id,
      name: '李四',
      certificateType: 0,
      certificateNumber: '44030419900101001X',
      sex: 1,
      birthDay: '1990-01-01',
      phone: '13800138000',
      isMarry: 1,
      isInsurance: 0,
      address: '北京市朝阳区'
    };

    const postData = JSON.stringify(patientInfo);

    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/user/patient/auth/update',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
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

// 删除就诊人信息
function deletePatient(token, id) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: `/api/user/patient/auth/${id}`,
      method: 'DELETE',
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
          resolve(result);
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

// 运行测试
testPatientApi().catch(console.error);
