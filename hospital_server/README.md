# Hospital Server

医院接口服务，使用 Node.js + Express 开发，提供医院数据的分页查询接口。

## 项目结构

```
hospital_server/
├── data/
│   └── hospital.json        # 医院数据存储
├── index.js                 # Express 服务器和接口实现
├── package.json             # 项目配置和依赖
├── pnpm-lock.yaml           # 依赖锁文件
├── .gitignore               # Git 忽略文件
└── README.md                # 项目说明文档
```

## 功能特性

- ✅ Express 服务器搭建
- ✅ 医院数据分页查询接口
- ✅ 参数验证
- ✅ 完整的响应格式
- ✅ 支持动态分页参数

## 安装依赖

```bash
# 使用 pnpm 安装依赖
pnpm install

# 或使用 npm
npm install

# 或使用 yarn
yarn install
```

## 运行项目

```bash
# 启动服务器
node index.js

# 服务器将运行在 http://localhost:3000
```

## API 接口文档

### 获取医院列表（分页）

**接口地址**：`GET /api/hosp/hospital/:page/:limit`

**参数说明**：
- `page`：当前页码（正整数）
- `limit`：每页数量（正整数）

**返回格式**：

```json
{
  "success": true,
  "data": {
    "list": [
      {
        "id": 1,
        "name": "医院1",
        "address": "地址1",
        "phone": "1234567890",
        "email": "hospital1@example.com",
        "type": "综合医院",
        "description": "这是一个综合医院，提供综合医疗服务。"
      }
    ],
    "total": 2,
    "page": 1,
    "limit": 1,
    "pages": 2
  },
  "message": "获取医院列表成功"
}
```

**错误响应**：

```json
{
  "success": false,
  "message": "页码和每页数量必须是正整数"
}
```

## 数据说明

- 医院数据存储在 `data/hospital.json` 文件中
- 支持动态添加、修改医院数据（直接编辑 JSON 文件）
- 当前数据包含医院的基本信息：ID、名称、地址、电话、邮箱、类型、描述

## 技术栈

- **Node.js**：JavaScript 运行时
- **Express**：Web 框架
- **FS 模块**：文件系统操作
- **Path 模块**：路径处理

## 开发说明

1. 项目使用 Express 5.2.1 版本
2. 代码结构清晰，便于扩展其他接口
3. 支持 CORS（可根据需要添加）
4. 支持添加中间件（日志、认证等）

## 测试示例

```bash
# 测试第1页，每页1条数据
curl http://localhost:3000/api/hosp/hospital/1/1

# 测试第2页，每页1条数据
curl http://localhost:3000/api/hosp/hospital/2/1

# 测试第1页，每页10条数据
curl http://localhost:3000/api/hosp/hospital/1/10
```

## 后续扩展建议

1. 添加 CORS 支持，允许跨域请求
2. 添加日志中间件，记录请求日志
3. 添加认证机制，保护接口安全
4. 支持按条件查询（如按医院类型、名称搜索）
5. 支持添加、修改、删除医院数据的接口
6. 连接数据库，替代 JSON 文件存储
7. 添加单元测试

## 许可证

ISC
