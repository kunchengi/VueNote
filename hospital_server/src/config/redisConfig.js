const redis = require('redis');

// Redis 客户端配置
let redisClient = null;
let isConnected = false;

// 创建 Redis 客户端
const createRedisClient = () => {
  try {
    // 创建 Redis 客户端实例
    redisClient = redis.createClient({
      url: 'redis://localhost:6379', // Redis 默认地址和端口
      // 可选配置
      connectTimeout: 5000, // 连接超时时间
      socket: {
        reconnectStrategy: (retries) => {
          // 重连策略：最多重连3次
          if (retries > 3) {
            console.log('Redis 重连次数已达上限，停止重连');
            return false; // 返回false表示停止重连，符合Redis客户端要求
          }
          return Math.min(retries * 100, 3000); // 递增延迟重连
        }
      }
    });

    // 监听连接事件
    redisClient.on('connect', () => {
      console.log('Redis 连接中...');
    });

    redisClient.on('ready', () => {
      console.log('Redis 连接成功');
      isConnected = true;
    });

    redisClient.on('error', (error) => {
      console.error('Redis 连接错误:', error.message);
      isConnected = false;
      // 错误时不抛出异常，允许系统降级到内存存储
    });

    redisClient.on('end', () => {
      console.log('Redis 连接已关闭');
      isConnected = false;
    });

    // 连接 Redis（使用try-catch包裹，避免连接失败导致应用崩溃）
    try {
      redisClient.connect();
    } catch (error) {
      console.error('Redis 初始连接失败:', error.message);
      isConnected = false;
    }
  } catch (error) {
    console.error('创建 Redis 客户端失败:', error.message);
  }
};

// 获取 Redis 客户端
const getRedisClient = () => {
  if (!redisClient) {
    createRedisClient();
  }
  return redisClient;
};

// 检查 Redis 是否连接
const isRedisConnected = () => {
  return isConnected;
};

// 导出配置
module.exports = {
  createRedisClient,
  getRedisClient,
  isRedisConnected
};
