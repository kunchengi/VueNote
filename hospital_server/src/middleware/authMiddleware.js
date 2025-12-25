const jwt = require('jsonwebtoken');

// JWT 密钥，与userService.js中的保持一致
const JWT_SECRET = 'your-secret-key-change-in-production';

// Token验证中间件
const verifyToken = (req, res, next) => {
  try {
    // 从请求头中获取token
    const token = req.headers.token;
    
    // 检查token是否存在
    if (!token) {
      return res.status(401).json({
        code: 401,
        success: false,
        message: '请登录'
      });
    }
    
    // 验证token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // 将解码后的用户信息存储在请求对象中，供后续中间件或控制器使用
    req.user = decoded;
    
    // 继续处理请求
    next();
  } catch (error) {
    // Token无效或过期
    return res.status(401).json({
      code: 401,
      success: false,
      message: '请登录'
    });
  }
};

module.exports = verifyToken;