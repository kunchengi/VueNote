const http = require('http');

// 测试配置
const BASE_URL = 'http://localhost:3000';
const API_PATH = '/api/hosp/hospital/auth/getBookingScheduleRule';

// 辅助函数：发送HTTP GET请求
function sendGetRequest(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: JSON.parse(data)
        });
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// 测试用例1：测试成功获取预约挂号列表
async function testSuccessfulBookingScheduleRule() {
  console.log('=== 测试用例1：测试成功获取预约挂号列表 ===');
  
  const queryParams = new URLSearchParams({
    page: '1',
    limit: '10',
    hoscode: '1000_10',
    depcode: '100304'
  });
  
  const url = `${BASE_URL}${API_PATH}?${queryParams.toString()}`;
  
  try {
    const response = await sendGetRequest(url);
    
    console.log(`状态码: ${response.statusCode}`);
    console.log(`成功标志: ${response.body.success}`);
    console.log(`返回消息: ${response.body.message}`);
    console.log(`总数量: ${response.body.data.total}`);
    console.log(`预约列表长度: ${response.body.data.bookingScheduleList.length}`);
    console.log(`基本信息: ${JSON.stringify(response.body.data.baseMap)}`);
    
    if (response.statusCode === 200 && response.body.success) {
      console.log('✅ 测试通过：成功获取预约挂号列表');
    } else {
      console.log('❌ 测试失败：未能成功获取预约挂号列表');
    }
  } catch (error) {
    console.error('❌ 测试失败：请求发生错误', error);
  }
  
  console.log('\n');
}

// 测试用例2：测试缺少必填参数
async function testMissingRequiredParams() {
  console.log('=== 测试用例2：测试缺少必填参数 ===');
  
  // 缺少hoscode参数
  const queryParams = new URLSearchParams({
    page: '1',
    limit: '10',
    depcode: '100304'
  });
  
  const url = `${BASE_URL}${API_PATH}?${queryParams.toString()}`;
  
  try {
    const response = await sendGetRequest(url);
    
    console.log(`状态码: ${response.statusCode}`);
    console.log(`成功标志: ${response.body.success}`);
    console.log(`返回消息: ${response.body.message}`);
    
    if (response.statusCode === 400 && !response.body.success) {
      console.log('✅ 测试通过：正确处理缺少必填参数的情况');
    } else {
      console.log('❌ 测试失败：未能正确处理缺少必填参数的情况');
    }
  } catch (error) {
    console.error('❌ 测试失败：请求发生错误', error);
  }
  
  console.log('\n');
}

// 测试用例3：测试无效的hoscode
async function testInvalidHoscode() {
  console.log('=== 测试用例3：测试无效的hoscode ===');
  
  const queryParams = new URLSearchParams({
    page: '1',
    limit: '10',
    hoscode: 'invalid_hoscode',
    depcode: '100304'
  });
  
  const url = `${BASE_URL}${API_PATH}?${queryParams.toString()}`;
  
  try {
    const response = await sendGetRequest(url);
    
    console.log(`状态码: ${response.statusCode}`);
    console.log(`成功标志: ${response.body.success}`);
    console.log(`返回消息: ${response.body.message}`);
    
    if (response.statusCode === 400 && !response.body.success) {
      console.log('✅ 测试通过：正确处理无效的hoscode');
    } else {
      console.log('❌ 测试失败：未能正确处理无效的hoscode');
    }
  } catch (error) {
    console.error('❌ 测试失败：请求发生错误', error);
  }
  
  console.log('\n');
}

// 测试用例4：测试无效的depcode
async function testInvalidDepcode() {
  console.log('=== 测试用例4：测试无效的depcode ===');
  
  const queryParams = new URLSearchParams({
    page: '1',
    limit: '10',
    hoscode: '1000_10',
    depcode: 'invalid_depcode'
  });
  
  const url = `${BASE_URL}${API_PATH}?${queryParams.toString()}`;
  
  try {
    const response = await sendGetRequest(url);
    
    console.log(`状态码: ${response.statusCode}`);
    console.log(`成功标志: ${response.body.success}`);
    console.log(`返回消息: ${response.body.message}`);
    
    if (response.statusCode === 400 && !response.body.success) {
      console.log('✅ 测试通过：正确处理无效的depcode');
    } else {
      console.log('❌ 测试失败：未能正确处理无效的depcode');
    }
  } catch (error) {
    console.error('❌ 测试失败：请求发生错误', error);
  }
  
  console.log('\n');
}

// 测试用例5：测试不同分页参数
async function testDifferentPaginationParams() {
  console.log('=== 测试用例5：测试不同分页参数 ===');
  
  // 测试第2页，每页5条
  const queryParams = new URLSearchParams({
    page: '2',
    limit: '5',
    hoscode: '1000_10',
    depcode: '100304'
  });
  
  const url = `${BASE_URL}${API_PATH}?${queryParams.toString()}`;
  
  try {
    const response = await sendGetRequest(url);
    
    console.log(`状态码: ${response.statusCode}`);
    console.log(`成功标志: ${response.body.success}`);
    console.log(`返回消息: ${response.body.message}`);
    console.log(`总数量: ${response.body.data.total}`);
    console.log(`预约列表长度: ${response.body.data.bookingScheduleList.length}`);
    
    if (response.statusCode === 200 && response.body.success) {
      console.log('✅ 测试通过：成功处理不同的分页参数');
    } else {
      console.log('❌ 测试失败：未能成功处理不同的分页参数');
    }
  } catch (error) {
    console.error('❌ 测试失败：请求发生错误', error);
  }
  
  console.log('\n');
}

// 运行所有测试用例
async function runAllTests() {
  console.log('开始测试获取医院预约挂号列表接口\n');
  
  await testSuccessfulBookingScheduleRule();
  await testMissingRequiredParams();
  await testInvalidHoscode();
  await testInvalidDepcode();
  await testDifferentPaginationParams();
  
  console.log('=== 所有测试用例执行完成 ===');
}

// 启动测试
runAllTests();
