const { getAndVerifyVerificationCode } = require('../utils/verificationCodeStore');
const { findUserByPhone, createUser, generateToken } = require('../services/userService');

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

module.exports = {
  login
};
