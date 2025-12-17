// 验证码存储，使用Redis存储，内存存储作为后备方案
const { getRedisClient, isRedisConnected } = require('../config/redisConfig');

// 内存存储作为Redis的后备方案
const verificationCodes = new Map();

// Redis 验证码前缀
const VERIFICATION_CODE_PREFIX = 'verification:code:';
// 验证码有效期（秒）
const VERIFICATION_CODE_EXPIRE = 5 * 60; // 5分钟

// 存储验证码，有效期5分钟
const storeVerificationCode = async (phone, code) => {
  try {
    // 如果Redis已连接，使用Redis存储
    if (isRedisConnected()) {
      const redisClient = getRedisClient();
      const key = `${VERIFICATION_CODE_PREFIX}${phone}`;
      await redisClient.set(key, code, { 
        EX: VERIFICATION_CODE_EXPIRE 
      });
      console.log(`验证码已存储到Redis，手机号: ${phone}，验证码: ${code}`);
      return;
    }
  } catch (error) {
    console.error('Redis存储验证码失败:', error.message);
  }
  
  // Redis不可用或存储失败时，使用内存存储作为后备方案
  const expiresAt = Date.now() + VERIFICATION_CODE_EXPIRE * 1000;
  verificationCodes.set(phone, { code, expiresAt });
  console.log(`验证码已存储到内存，手机号: ${phone}，验证码: ${code}`);
  
  // 设置内存中验证码的过期自动删除
  setTimeout(() => {
    if (verificationCodes.has(phone)) {
      const stored = verificationCodes.get(phone);
      if (stored.expiresAt <= Date.now()) {
        verificationCodes.delete(phone);
        console.log(`内存中验证码已过期删除，手机号: ${phone}`);
      }
    }
  }, VERIFICATION_CODE_EXPIRE * 1000);
};

// 获取并验证验证码
const getAndVerifyVerificationCode = async (phone, code) => {
  try {
    // 如果Redis已连接，优先从Redis获取
    if (isRedisConnected()) {
      const redisClient = getRedisClient();
      const key = `${VERIFICATION_CODE_PREFIX}${phone}`;
      const storedCode = await redisClient.get(key);
      
      if (!storedCode) {
        return { valid: false, message: '验证码不存在或已过期' };
      }
      
      if (storedCode !== code) {
        return { valid: false, message: '验证码错误' };
      }
      
      // 验证码正确，删除Redis中的验证码
      await redisClient.del(key);
      console.log(`Redis中验证码已验证并删除，手机号: ${phone}`);
      return { valid: true, message: '验证码验证成功' };
    }
  } catch (error) {
    console.error('Redis验证验证码失败:', error.message);
  }
  
  // Redis不可用或验证失败时，使用内存存储作为后备方案
  if (!verificationCodes.has(phone)) {
    return { valid: false, message: '验证码不存在或已过期' };
  }
  
  const stored = verificationCodes.get(phone);
  const now = Date.now();
  
  // 检查是否过期
  if (stored.expiresAt < now) {
    verificationCodes.delete(phone);
    return { valid: false, message: '验证码已过期' };
  }
  
  // 检查验证码是否匹配
  if (stored.code !== code) {
    return { valid: false, message: '验证码错误' };
  }
  
  // 验证码正确，删除内存中的验证码
  verificationCodes.delete(phone);
  console.log(`内存中验证码已验证并删除，手机号: ${phone}`);
  return { valid: true, message: '验证码验证成功' };
};

module.exports = {
  storeVerificationCode,
  getAndVerifyVerificationCode
};
