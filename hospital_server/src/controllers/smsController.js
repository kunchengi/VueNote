// 生成6位随机数字验证码
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const { storeVerificationCode } = require('../utils/verificationCodeStore');

// 模拟获取验证码
const sendSms = async (req, res) => {
  try {
    const phone = req.params.phone;
    
    // 验证手机号格式（简单验证）
    if (!phone || !/^1\d{10}$/.test(phone)) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: '获取验证码失败'
      });
    }
    
    // 生成6位验证码
    const code = generateVerificationCode();
    
    // 存储验证码（异步操作）
    await storeVerificationCode(phone, code);
    
    // 返回验证码（模拟环境下直接返回）
    res.json({
      code: 200,
      success: true,
      data: code,
      message: '获取验证码成功'
    });
  } catch (error) {
    console.error('Error in sendSms:', error);
    res.status(400).json({
      code: 400,
      success: false,
      message: '获取验证码失败'
    });
  }
};

module.exports = {
  sendSms
};
