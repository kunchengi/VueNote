# Hospital Server

医院接口服务，使用 Node.js + Express 开发，提供医院数据的分页查询接口和字典数据查询接口。

## 项目结构

```
hospital_server/
├── data/
│   ├── hospital.json        # 医院数据存储
│   └── dictData.json        # 字典数据存储
├── src/
│   ├── config/
│   │   └── appConfig.js     # 应用配置
│   ├── controllers/
│   │   ├── hospitalController.js  # 医院控制器
│   │   └── dictController.js      # 字典控制器
│   ├── routes/
│   │   ├── hospitalRoutes.js      # 医院路由
│   │   └── dictRoutes.js          # 字典路由
│   └── services/
│       ├── hospitalService.js     # 医院服务
│       └── dictService.js         # 字典服务
├── index.js                 # Express 服务器入口
├── package.json             # 项目配置和依赖
├── pnpm-lock.yaml           # 依赖锁文件
├── .gitignore               # Git 忽略文件
└── README.md                # 项目说明文档
```

## 功能特性

- ✅ Express 服务器搭建
- ✅ 医院数据分页查询接口
- ✅ 字典数据查询接口
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
  "code": 200,
  "success": true,
  "data": {
    "content": [
      {
        "id": "0001",
        "createTime": "2022-03-07 10:58:46",
        "updateTime": "2022-05-25 15:28:46",
        "isDeleted": 0,
        "param": {
          "hostypeString": "三级乙等",
          "fullAddress": "北京市市辖区西城区"
        },
        "hoscode": "1000_10",
        "hosname": "航天中心医院",
        "hostype": "2",
        "provinceCode": "110000",
        "cityCode": "110100",
        "districtCode": "110102",
        "address": "北京市市辖区西城区航天中心医院",
        "logoData": "医院logo图片URL",
        "bookingRule": {
          "cycle": 10,
          "releaseTime": "08:00:00",
          "stopTime": "12:30:00",
          "quitDay": -1,
          "quitTime": "15:30:00"
        },
        "intro": "医院介绍信息",
        "route": "医院地址",
        "status": 1
      }
    ],
    "pageable": {
      "sort": {
        "sorted": false,
        "unsorted": true,
        "empty": true
      },
      "offset": 0,
      "pageSize": 1,
      "pageNumber": 0,
      "paged": true,
      "unpaged": false
    },
    "totalPages": 1,
    "totalElements": 1,
    "first": true,
    "last": true,
    "sort": {
      "sorted": false,
      "unsorted": true,
      "empty": true
    },
    "numberOfElements": 1,
    "size": 1,
    "number": 0,
    "empty": false
  },
  "message": "获取医院列表成功"
}
```

**错误响应**：

```json
{
  "code": 400,
  "success": false,
  "message": "页码和每页数量必须是正整数"
}
```

### 获取目录列表

**接口地址**：`GET /api/cmn/dict/findByDictCode/:dictCode`

**参数说明**：
- `dictCode`：目录代码，获取该目录代码的子目录列表
  - 如果为 `Hostype`，则返回医院等级列表
  - 如果为 `Beijing`，则返回北京的区列表

**返回格式**：

```json
{
  "code": 200,
  "success": true,
  "data": [
    {
        "id": 10001,
        "createTime": "2025-12-02 00:00:00",
        "updateTime": "2025-12-02 00:00:00",
        "isDeleted": 0,
        "param": {
        },
        "parentId": 10000,
        "name": "三级甲等",
        "value": "1",
        "dictCode": "",
        "hasChildren": false
    }
  ],
  "message": "获取xxx列表成功"
}
```

**错误响应**：

```json
{
  "code": 400,
  "success": false,
  "message": "目录代码不存在"
}
```

## 数据说明

- 医院数据存储在 `data/hospital.json` 文件中
  - 支持动态添加、修改医院数据（直接编辑 JSON 文件）
  - 当前数据包含医院的基本信息：ID、名称、地址、电话、邮箱、类型、描述、预约规则等
- 字典数据存储在 `data/dictData.json` 文件中
  - 包含医院等级、北京各区等字典数据
  - 支持通过字典代码获取对应的数据列表

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

### 医院列表接口测试
```bash
# 测试第1页，每页1条数据
curl http://localhost:3000/api/hosp/hospital/1/1

# 测试第2页，每页1条数据
curl http://localhost:3000/api/hosp/hospital/2/1

# 测试第1页，每页10条数据
curl http://localhost:3000/api/hosp/hospital/1/10
```

### 字典接口测试
```bash
# 获取医院等级列表
curl http://localhost:3000/api/cmn/dict/findByDictCode/Hostype

# 获取北京各区列表
curl http://localhost:3000/api/cmn/dict/findByDictCode/Beijing

# 测试不存在的字典代码（应返回错误）
curl http://localhost:3000/api/cmn/dict/findByDictCode/InvalidCode
```

## 后续扩展建议

1. 添加 CORS 支持，允许跨域请求
2. 添加日志中间件，记录请求日志
3. 添加认证机制，保护接口安全
4. 支持按条件查询（如按医院类型、名称搜索）
5. 支持添加、修改、删除医院数据的接口
6. 连接数据库，替代 JSON 文件存储
7. 添加单元测试

## 更改日志

### v1.0.0 (最近更新)
- 新增字典数据查询接口 `/api/cmn/dict/findByDictCode/:dictCode`
- 支持获取医院等级列表和北京各区列表
- 更新了项目结构，添加了字典相关的控制器、路由和服务
- 完善了数据存储，添加了 `dictData.json` 字典数据文件
- 删除了 `/health` 健康检查接口，简化 API 接口结构
- 更新了项目结构，使用模块化设计（src目录）
- 优化了启动日志输出

## 许可证

ISC
