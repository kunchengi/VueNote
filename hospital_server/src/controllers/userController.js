const axios = require('axios');
const { getAndVerifyVerificationCode } = require('../utils/verificationCodeStore');
const { findUserByPhone, createUser, generateToken } = require('../services/userService');
const { successResponse, errorResponse } = require('../utils/responseUtils');

// 登录控制器
const login = async (req, res) => {
  try {
    // 获取请求体参数
    const { phone, code } = req.body;
    
    // 1. 验证参数
    if (!phone || !code) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: '手机号和验证码不能为空'
      });
    }
    
    // 验证手机号格式
    if (!/^1\d{10}$/.test(phone)) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: '手机号格式不正确'
      });
    }
    
    // 2. 验证验证码
    const verifyResult = await getAndVerifyVerificationCode(phone, code);
    if (!verifyResult.valid) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: verifyResult.message
      });
    }
    
    // 3. 检查用户是否存在
    let user = await findUserByPhone(phone);
    
    // 4. 如果用户不存在，创建新用户
    if (!user) {
      user = await createUser(phone);
    }
    
    // 5. 生成token
    const token = generateToken(user.phone, user.name);
    
    // 6. 返回登录成功结果
    res.json({
      code: 200,
      success: true,
      data: {
        name: user.name,
        token: token
      },
      message: '登录成功'
    });
  } catch (error) {
    console.error('Error in login:', error);
    res.status(400).json({
      code: 400,
      success: false,
      message: '登录失败'
    });
  }
};

// 获取微信登录二维码信息
const wxQrLink = async (req, res) => {
  try {
    console.log('=== 获取微信登录二维码信息请求开始 ===');
    
    // 获取请求体参数
    const { reg_source } = req.body;
    console.log('请求参数 reg_source:', reg_source);
    
    // 调用外部API获取微信登录二维码信息
    console.log('准备调用外部API...');
    const response = await axios.post('https://api2.mubu.com/v3/api/platform/wx_qr_link', 
      { reg_source: reg_source || '' },
      {
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Accept-Language': 'zh-CN,zh;q=0.9',
          'Connection': 'keep-alive',
          'Content-Type': 'application/json',
          'Jwt-Token': 'mubuapp的token',
          'Origin': 'https://mubu.com',
          'Referer': 'https://mubu.com/',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-site',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36',
          'data-unique-id': 'mubu的唯一id',
          'deviceModel': 'Chrome',
          'osVersion': '143.0.0.0',
          'platform': 'web',
          'sec-ch-ua': '"Google Chrome";v="143", "Chromium";v="143", "Not A(Brand";v="24"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'system': 'Windows',
          'x-reg-entrance': 'https://mubu.com/home',
          'x-request-id': 'mubu的request-id',
          'x-session-id': 'mubu的session-id'
        }
      }
    );
    
    console.log('外部API响应状态:', response.status);
    console.log('外部API响应数据:', JSON.stringify(response.data, null, 2));
    
    // 检查外部API响应状态
    if (response.status === 200) {
      if (response.data && response.data.code === 0 && response.data.data) {
        console.log('外部API调用成功，返回二维码信息');
        return successResponse(res, response.data.data, '获取微信登录二维码信息成功');
      } else {
        console.log('外部API调用失败，返回错误信息:', response.data?.message || '未知错误');
        console.log('外部API返回数据:', JSON.stringify(response.data, null, 2));
        return errorResponse(res, 400, '获取微信登录二维码信息失败');
      }
    } else {
      console.log('外部API调用失败，HTTP状态码:', response.status);
      return errorResponse(res, 400, '获取微信登录二维码信息失败');
    }
  } catch (error) {
    console.error('=== 获取微信登录二维码信息请求失败 ===');
    console.error('错误类型:', typeof error);
    console.error('错误信息:', error.message);
    
    if (error.response) {
      console.error('错误响应状态:', error.response.status);
      console.error('错误响应数据:', JSON.stringify(error.response.data, null, 2));
      console.error('错误响应头:', JSON.stringify(error.response.headers, null, 2));
    } else if (error.request) {
      console.error('未收到响应:', error.request);
    } else {
      console.error('请求配置错误:', error.stack);
    }
    
    return errorResponse(res, 400, '获取微信登录二维码信息失败');
  } finally {
    console.log('=== 获取微信登录二维码信息请求结束 ===\n');
  }
};

module.exports = {
  login,
  wxQrLink
};
