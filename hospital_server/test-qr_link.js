const axios = require('axios');

// 测试获取微信登录二维码信息接口
async function testWxQrLink() {
  try {
    // 测试请求URL
    const url = 'http://localhost:3000/api/user/wx_qr_link';
    
    // 测试请求参数
    const requestBody = {
      reg_source: ''
    };
    
    console.log('正在测试获取微信登录二维码信息接口...');
    console.log('请求URL:', url);
    console.log('请求参数:', requestBody);
    
    // 发送POST请求
    const response = await axios.post(url, requestBody, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    // 输出响应结果
    console.log('\n响应状态:', response.status);
    console.log('响应数据:', JSON.stringify(response.data, null, 2));
    
    // 验证响应格式
    if (response.status === 200) {
      const data = response.data;
      
      // 验证基本响应结构
      if (data.code === 200 && data.success === true) {
        console.log('\n✅ 测试通过！获取微信登录二维码信息成功');
        
        // 验证数据字段
        if (data.data && data.data.qrLink && data.data.state) {
          console.log('✅ 二维码链接:', data.data.qrLink);
          console.log('✅ 状态值:', data.data.state);
          return true;
        } else {
          console.log('❌ 测试失败！响应数据缺少必要字段');
          return false;
        }
      } else {
        console.log('❌ 测试失败！接口返回错误信息:', data.message);
        return false;
      }
    } else {
      console.log('❌ 测试失败！HTTP状态码异常:', response.status);
      return false;
    }
  } catch (error) {
    console.log('\n❌ 测试失败！发生异常:', error.message);
    if (error.response) {
      console.log('响应状态:', error.response.status);
      console.log('响应数据:', JSON.stringify(error.response.data, null, 2));
    }
    return false;
  }
}

// 测试获取微信登录扫码结果接口
async function testWxRefresh(state) {
  try {
    // 测试请求URL
    const url = 'http://localhost:3000/api/user/wx_refresh';
    
    // 测试请求参数
    const requestBody = {
      state: state,
      type: 'weixin',
      callbackType: 0
    };
    
    console.log('\n正在测试获取微信登录扫码结果接口...');
    console.log('请求URL:', url);
    console.log('请求参数:', requestBody);
    
    // 发送POST请求
    const response = await axios.post(url, requestBody, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    // 输出响应结果
    console.log('\n响应状态:', response.status);
    console.log('响应数据:', JSON.stringify(response.data, null, 2));
    
    // 验证响应格式
    if (response.status === 200) {
      const data = response.data;
      
      // 验证基本响应结构
      if (data.code === 200 && data.success === true) {
        console.log('\n✅ 测试通过！获取微信登录扫码结果接口调用成功');
        
        // 扫码结果可能有两种情况：未扫码或扫码成功
        if (data.data === null && data.msg === '请先扫描二维码') {
          console.log('✅ 当前状态：用户未扫码，返回结果符合预期');
        } else if (data.data) {
          console.log('✅ 当前状态：用户已扫码，返回用户信息');
        }
        
        return true;
      } else {
        console.log('\n❌ 测试失败！接口返回错误信息:', data.msg);
        return false;
      }
    } else {
      console.log('\n❌ 测试失败！HTTP状态码异常:', response.status);
      return false;
    }
  } catch (error) {
    console.log('\n❌ 测试失败！发生异常:', error.message);
    if (error.response) {
      console.log('响应状态:', error.response.status);
      console.log('响应数据:', JSON.stringify(error.response.data, null, 2));
    }
    return false;
  }
}

// 运行完整测试流程：先获取二维码信息，再测试扫码结果
async function runFullTest() {
  console.log('=== 开始微信登录完整测试流程 ===\n');
  
  try {
    // 1. 测试获取微信登录二维码信息，获取state参数
    console.log('1. 测试获取微信登录二维码信息接口...');
    const qrLinkResult = await testWxQrLink();
    
    if (!qrLinkResult) {
      console.log('\n❌ 测试流程失败：获取二维码信息失败');
      return false;
    }
    
    // 重新调用一次获取state参数（因为testWxQrLink函数返回的是布尔值）
    const url = 'http://localhost:3000/api/user/wx_qr_link';
    const response = await axios.post(url, { reg_source: '' }, {
      headers: { 'Content-Type': 'application/json' }
    });
    
    const state = response.data.data.state;
    console.log('\n✅ 获取到state参数:', state);
    
    // 2. 使用获取到的state参数测试扫码结果接口
    console.log('\n2. 使用state参数测试微信登录扫码结果接口...');
    const refreshResult = await testWxRefresh(state);
    
    if (!refreshResult) {
      console.log('\n❌ 测试流程失败：扫码结果接口测试失败');
      return false;
    }
    
    console.log('\n=== 微信登录完整测试流程成功完成 ===');
    return true;
  } catch (error) {
    console.error('\n❌ 测试流程执行失败:', error);
    return false;
  }
}

// 运行测试
if (require.main === module) {
  runFullTest()
    .then(success => {
      process.exit(success ? 0 : 1);
    })
    .catch(error => {
      console.error('测试执行失败:', error);
      process.exit(1);
    });
}

module.exports = { testWxQrLink, testWxRefresh, runFullTest };
