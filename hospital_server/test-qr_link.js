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

// 运行测试
if (require.main === module) {
  testWxQrLink()
    .then(success => {
      process.exit(success ? 0 : 1);
    })
    .catch(error => {
      console.error('测试执行失败:', error);
      process.exit(1);
    });
}

module.exports = { testWxQrLink };
