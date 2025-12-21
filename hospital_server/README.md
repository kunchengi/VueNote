# Hospital Server

医院接口服务，使用 Node.js + Express 开发，提供医院数据的分页查询接口和字典数据查询接口。

## 项目结构

```
hospital_server/
├── data/
│   ├── article/            # 文章/通知等HTML文件存储
│   ├── hospital.json       # 医院数据存储
│   ├── dictData.json       # 字典数据存储
│   └── department.json     # 科室数据存储
├── src/
│   ├── config/
│   │   ├── appConfig.js    # 应用配置
│   │   ├── dbConfig.js     # MongoDB数据库配置
│   │   └── redisConfig.js  # Redis配置
│   ├── controllers/
│   │   ├── hospitalController.js  # 医院控制器
│   │   ├── dictController.js      # 字典控制器
│   │   ├── smsController.js       # 短信验证码控制器
│   │   └── userController.js      # 用户登录控制器
│   ├── models/
│   │   └── userModel.js           # 用户数据模型
│   ├── routes/
│   │   ├── dictRoutes.js          # 字典路由
│   │   ├── hospitalRoutes.js      # 医院相关路由
│   │   ├── smsRoutes.js           # 短信验证码路由
│   │   └── userRoutes.js          # 用户登录路由
│   ├── services/
│   │   ├── hospitalService.js     # 医院服务
│   │   ├── dictService.js         # 字典服务
│   │   └── userService.js         # 用户服务
│   └── utils/
│       ├── responseUtils.js       # 响应工具函数
│       ├── verificationCodeStore.js  # 验证码存储和验证工具
│       └── jwtUtils.js            # JWT token工具
├── index.js                 # Express 服务器入口
├── package.json             # 项目配置和依赖
├── pnpm-lock.yaml           # 依赖锁文件
├── .gitignore               # Git 忽略文件
└── README.md                # 项目说明文档
```

## 功能特性

- ✅ Express 服务器搭建
- ✅ 医院数据分页查询接口
- ✅ 支持按医院等级和地区筛选
- ✅ 根据医院名称模糊查找医院列表
- ✅ 根据医院编码获取医院详情
- ✅ 根据医院编码获取科室信息接口
- ✅ 字典数据查询接口
- ✅ 通过文件名获取HTML文件内容
- ✅ 模拟短信验证码发送接口
- ✅ 参数验证
- ✅ 完整的响应格式
- ✅ 统一的响应工具函数
- ✅ 手机号+验证码登录接口
- ✅ 首次登录自动注册功能
- ✅ JWT token生成和验证
- ✅ Redis存储验证码（5分钟过期）
- ✅ MongoDB用户数据存储
- ✅ Redis→内存存储降级策略
- ✅ 全局异常处理
- ✅ Redis连接错误容错机制
- ✅ 获取微信登录二维码信息接口

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
- `page`：当前页码（正整数）- 路径参数
- `limit`：每页数量（正整数）- 路径参数
- `hostype`：医院等级编码（可选）- 查询参数
- `districtCode`：地区编码（可选）- 查询参数

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

### 根据医院名称模糊查找医院列表

**接口地址**：`GET /api/hosp/hospital/findByHosname/:hosname`

**参数说明**：
- `hosname`：医院名称（字符串）- 路径参数

**返回格式**：

```json
{
  "code": 200,
  "success": true,
  "data": [
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
  "message": "获取医院列表成功"
}
```

**错误响应**：

```json
{
  "code": 400,
  "success": false,
  "message": "医院名称不能为空"
}
```

### 通过hoscode获取医院详情

**接口地址**：`GET /api/hosp/hospital/:hoscode`

**参数说明**：
- `hoscode`：医院编码（字符串）- 路径参数


**返回格式**：

```json
{
  "code": 200,
  "success": true,
  "data": {
        "id": "0021",
        "createTime": "2025-12-02 00:00:00",
        "updateTime": "2025-12-02 00:00:00",
        "isDeleted": 0,
        "param": {
            "hostypeString": "二级乙等",
            "fullAddress": "北京市海淀区羊坊店西路"
        },
        "hoscode": "1000_30",
        "hosname": "北京市羊坊店医院",
        "hostype": "4",
        "provinceCode": "110000",
        "cityCode": "110100",
        "districtCode": "110108",
        "address": "羊坊店西路",
        "logoData": "https://img1.dxycdn.com/2020/1020/047/7708190091835572443-7.jpg",
        "bookingRule": {
            "cycle": 7,
            "releaseTime": "08:00",
            "stopTime": "12:30",
            "quitDay": -1,
            "quitTime": "15:30",
            "rule": [
                "预约实名制：请提供就诊患者真实姓名、身份证号（身份证、军官证、护照）、患者本人手机号等信息。",
                "电话及网络预约为北京市统一预约挂号平台预约:可预约七日内号源，支持24小时服务。",
                "微信公众号预约：需到人工窗口取号。"
            ]
        },
        "intro": "京市羊坊店医院（原名北京铁路局羊坊店铁路医院）是北京市海淀区卫生健康委员会直属的二级综合医院 。该院为医疗保险定点医疗机构，以康复医疗为主，设有内科、外科、康复科等46个临床及职能科室，配备3台车辆和22台（套）百万级以上医疗设备，事业编制212人。其监护病房实行全封闭管理，配置10张监护床位及多功能监护仪、呼吸机等设备，可监测多项生命体征指标。",
        "route": "公交线路： 65路、85路：北蜂窝路站、北蜂窝路南口站；夜36路、夜23路、45路、14路、50路、3路、40路、夜5路、夜8路、 62路、 47路、663路：小马厂站；47路：小马厂（东行）站；320路、78路、308路、114路：公安大学站； \n地铁线路：1号线、16号线：木樨地站；7号线、9号线北京西站",
        "status": 1
    },
  "message": "获取医院详情成功"
}
```

**错误响应**：

```json
{
  "code": 400,
  "success": false,
  "message": "医院编码不存在"
}
```

### 通过文件名获取文件内容

**接口地址**：`GET /api/hosp/article/:filename`

**描述**：根据文件名获取文件内容，如`/api/hosp/article/noticeArticle.html`则获取`hospital_server\data\article\noticeArticle.html`的文件内容

**参数说明**：
- `filename`：文件名（字符串）- 路径参数


**返回格式**：

```html
<div>
    <h1>这是一个通知标题</h1>
    <p>这是一个通知内容</p>
</div>
```

**错误响应**：

```json
{
  "code": 400,
  "success": false,
  "message": "文件不存在"
}
```

### 通过hoscode获取医院科室

**接口地址**：`GET /api/hosp/hospital/department/:hoscode`

**接口说明**：根据医院编码获取医院的所有科室，由于目前department.json文件只有一个医院的数据，所以不管hoscode是什么，都返回该文件中的科室信息就行，后续数据更新再做相应调整。


**参数说明**：
- `hoscode`：医院编码（字符串）- 路径参数


**返回格式**：

```json
{
  "code": 200,
  "success": true,
  "data": [
    {
        "depcode": "1001",
        "depname": "心脏",
        "children": [
            {
                "depcode": "100101",
                "depname": "心血管专科",
                "children": null
            },
            {
                "depcode": "100102",
                "depname": "冠心病专科",
                "children": null
            },
            {
                "depcode": "100103",
                "depname": "高血压专科",
                "children": null
            },
            {
                "depcode": "100104",
                "depname": "心衰专科",
                "children": null
            },
            {
                "depcode": "100105",
                "depname": "心律失常专科",
                "children": null
            },
            {
                "depcode": "100106",
                "depname": "胸痛专科",
                "children": null
            },
            {
                "depcode": "100107",
                "depname": "心胸专科",
                "children": null
            }
        ]
    }
  ],
  "message": "获取医院科室成功"
}
```

**错误响应**：

```json
{
  "code": 400,
  "success": false,
  "message": "获取医院科室失败"
}
```

### 获取验证码（模拟）

**接口地址**：`GET /api/sms/send/:phone`

**接口说明**：理论上是要将验证码推送到用户手机号，但由于当前环境是模拟，所以直接返回一个6位随机数字验证码。

**参数说明**：
- `phone`：手机号（字符串）- 路径参数

**返回格式**：

```json
{
  "code": 200,
  "success": true,
  "data": "123456",
  "message": "获取验证码成功"
}
```

**错误响应**：

```json
{
  "code": 400,
  "success": false,
  "message": "获取验证码失败"
}
```

### 登录

**接口地址**：`POST /api/user/login`

**接口说明**：根据手机号和验证码登录。如果是首次登录，会自动执行注册逻辑，将手机号和初始名称（用户+随机编号）写入MongoDB数据库。登录成功后返回用户名称和JWT token。

**参数说明**：
- `phone`：手机号（字符串）- 请求体参数
- `code`：验证码（字符串）- 请求体参数

**返回格式**：

```json
{
  "code": 200,
  "success": true,
  "data": {
    "name": "用户1425",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjEzODAwMTM4MDAwIiwibmFtZSI6Iui/mOWbveS4iSIsImlhdCI6MTczNDQyNjIzNX0.4Z4fKz6X5aZ5bZ5cZ5dZ5eZ5fZ5gZ5hZ5iZ5jZ5k"
  },
  "message": "登录成功"
}
```

**错误响应**：

```json
{
  "code": 400,
  "success": false,
  "message": "验证码错误"
}
```

```json
{
  "code": 400,
  "success": false,
  "message": "验证码已过期"
}
```

```json
{
  "code": 400,
  "success": false,
  "message": "手机号或验证码不能为空"
}
```

### 获取微信登录二维码信息

**接口地址**：`POST /api/user/wx_qr_link`

**接口说明**：通过其它网站的接口获取微信登录二维码信息，并将响应体直接返回给客户端。

- 其它网站获取微信登录二维码信息的接口：`POST https://api2.mubu.com/v3/api/platform/wx_qr_link`
- curl 命令示例：
  ```bash
  curl 'https://api2.mubu.com/v3/api/platform/wx_qr_link' \
    -H 'Accept: application/json, text/plain, */*' \
    -H 'Accept-Language: zh-CN,zh;q=0.9' \
    -H 'Connection: keep-alive' \
    -H 'Content-Type: application/json' \
    -H 'Jwt-Token: mubuapp的token' \
    -H 'Origin: https://mubu.com' \
    -H 'Referer: https://mubu.com/' \
    -H 'Sec-Fetch-Dest: empty' \
    -H 'Sec-Fetch-Mode: cors' \
    -H 'Sec-Fetch-Site: same-site' \
    -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36' \
    -H 'data-unique-id: mubu的唯一id' \
    -H 'deviceModel: Chrome' \
    -H 'osVersion: 143.0.0.0' \
    -H 'platform: web' \
    -H 'sec-ch-ua: "Google Chrome";v="143", "Chromium";v="143", "Not A(Brand";v="24"' \
    -H 'sec-ch-ua-mobile: ?0' \
    -H 'sec-ch-ua-platform: "Windows"' \
    -H 'system: Windows' \
    -H 'x-reg-entrance: https://mubu.com/home' \
    -H 'x-request-id: mubu的request-id' \
    -H 'x-session-id: mubu的session-id' \
    --data-raw '{"reg_source":""}'
  ```

**参数说明**：
- `reg_source`：注册来源（字符串）- 请求体参数，可为空字符串

**返回格式**：

```json
{
  "code": 200,
  "success": true,
  "data": {
      "qrLink": "http://weixin.qq.com/q/02mHodxN-1fHD1uoC71F1z",
      "state": "1371919979"
  }
  "message": "登录成功"
}
```

**错误响应**：

```json
{
  "code": 400,
  "success": false,
  "message": "获取微信登录二维码信息失败"
}
```

## 数据说明

- 医院数据存储在 `data/hospital.json` 文件中
  - 支持动态添加、修改医院数据（直接编辑 JSON 文件）
  - 当前数据包含医院的基本信息：ID、名称、地址、电话、邮箱、类型、描述、预约规则等
- 字典数据存储在 `data/dictData.json` 文件中
  - 包含医院等级、北京各区等字典数据
  - 支持通过字典代码获取对应的数据列表
- 文章/通知等HTML文件存储在 `data/article/` 目录中
  - 支持动态添加HTML文件
  - 通过文件名即可访问对应的HTML内容
- 科室数据存储在 `data/department.json` 文件中
  - 包含科室的层级结构数据
  - 支持通过医院编码获取科室列表（目前忽略hoscode，返回所有科室）
- 用户数据存储在 MongoDB 数据库中
  - 数据库名称：`hospital_system`
  - 集合名称：`users`
  - 包含用户的基本信息：手机号、用户名、创建时间等
  - 首次登录时自动注册，初始用户名为：用户+随机编号

## 技术栈

- **Node.js**：JavaScript 运行时
- **Express**：Web 框架
- **FS 模块**：文件系统操作
- **Path 模块**：路径处理
- **Redis**：分布式验证码存储（支持内存降级）
- **MongoDB**：用户数据存储
- **Mongoose**：MongoDB ODM
- **JWT**：用户认证和授权
- **jsonwebtoken**：JWT token生成和验证
- **axios**：HTTP客户端，用于调用外部API

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

# 测试按医院等级筛选
curl http://localhost:3000/api/hosp/hospital/1/10?hostype=1

# 测试按地区筛选
curl http://localhost:3000/api/hosp/hospital/1/10?districtCode=110102
```

### 医院详情接口测试
```bash
# 测试通过医院编码获取医院详情
curl http://localhost:3000/api/hosp/hospital/1000_10

# 测试通过医院名称模糊查找
curl http://localhost:3000/api/hosp/hospital/findByHosname/医院
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

### 文章/通知接口测试
```bash
# 测试获取存在的HTML文件
curl http://localhost:3000/api/hosp/article/testArticle.html

# 测试获取不存在的HTML文件（应返回错误）
curl http://localhost:3000/api/hosp/article/notExist.html
```

### 科室信息接口测试
```bash
# 测试获取医院科室信息
curl http://localhost:3000/api/hosp/hospital/department/1000_10

# 测试获取医院科室信息（使用不同的hoscode，结果相同）
curl http://localhost:3000/api/hosp/hospital/department/any_hoscode
```

### 短信验证码接口测试
```bash
# 测试获取验证码（使用有效手机号）
curl http://localhost:3000/api/sms/send/13800138000
```

### 登录接口测试
```bash
# 测试登录（使用有效手机号和验证码）
curl -X POST -H "Content-Type: application/json" -d '{"phone":"13800138000","code":"123456"}' http://localhost:3000/api/user/login
```

### 获取微信登录二维码信息接口测试
```bash
# 测试获取微信登录二维码信息
curl -X POST -H "Content-Type: application/json" -d '{"reg_source":""}' http://localhost:3000/api/user/wx_qr_link
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
- 新增通过文件名获取文件内容接口 `/api/hosp/article/:filename`
- 新增 `data/article/` 目录用于存储HTML文件
- 为医院列表接口添加了 `hostype` 和 `districtCode` 查询参数支持
- 新增根据医院名称模糊查询接口 `/api/hosp/hospital/findByHosname/:hosname`
- 添加了 `responseUtils.js` 统一响应工具函数
- 新增字典数据查询接口 `/api/cmn/dict/findByDictCode/:dictCode`
- 支持获取医院等级列表和北京各区列表
- 更新了项目结构，添加了字典相关的控制器、路由和服务
- 完善了数据存储，添加了 `dictData.json` 字典数据文件
- 删除了 `/health` 健康检查接口，简化 API 接口结构
- 更新了项目结构，使用模块化设计（src目录）
- 优化了启动日志输出
- 新增根据医院编码获取科室信息接口 `/api/hosp/hospital/department/:hoscode`
- 完善了数据存储，添加了 `department.json` 科室数据文件
- 更新了医院服务，添加了科室信息相关的服务方法
- 更新了医院控制器，添加了科室信息相关的控制方法
- 更新了启动日志，添加了科室API的日志输出
- 新增模拟短信验证码发送接口 `/api/sms/send/:phone`
- 更新了项目结构，添加了 `smsController.js` 短信控制器
- 更新了启动日志，添加了短信验证码API的日志输出
- 新增手机号+验证码登录接口 `/api/user/login`
- 实现首次登录自动注册功能，使用MongoDB存储用户数据
- 新增JWT token生成和验证功能
- 实现Redis存储验证码（5分钟过期）
- 添加Redis→内存存储降级策略，确保系统可用性
- 新增全局异常处理，提高系统稳定性
- 更新项目结构，添加用户相关的模型、控制器、路由和服务
- 新增 `dbConfig.js` MongoDB配置文件
- 新增 `redisConfig.js` Redis配置文件，支持连接重试和错误处理
- 新增 `jwtUtils.js` JWT工具函数
- 新增 `verificationCodeStore.js` 验证码存储和验证工具
- 优化了项目路由结构，添加了各模块独立路由文件
- 修复了MongoDB连接配置问题（移除过时选项）
- 修复了Redis重连策略错误
- 修复了Redis连接失败导致应用崩溃的问题
- 完善了错误处理机制，确保系统在服务不可用时仍能正常运行
- 新增获取微信登录二维码信息接口 `/api/user/wx_qr_link`
- 添加了axios依赖，用于发送HTTP请求到外部API
- 更新了用户控制器，添加了获取微信登录二维码信息的控制方法
- 更新了启动日志，添加了微信登录二维码API的日志输出
- 新增测试脚本 `test-qr_link.js` 用于测试微信登录二维码接口

## 许可证

ISC

## 安装并启动Redis

1. 下载Redis
  - 访问 [GitHub下载页面](https://github.com/tporadowski/redis/releases)
  - 选择最新版本的MSI安装包（适合Windows用户）下载
2. 安装Redis
  - 双击下载的MSI文件，按照安装向导进行安装
  - 勾选「Add Redis to the PATH environment variable」选项，以便在命令行中直接使用Redis命令
3. 启动Redis服务
  - 安装完成后，Redis服务会自动启动
  - 可以通过以下命令验证Redis是否运行
  ```bash
  redis-cli ping
  ```
  - 如果返回 `PONG`，则表示Redis服务运行正常

## 安装并启动MongoDB

1. 下载MongoDB
  - 访问 [MongoDB下载页面](https://www.mongodb.com/try/download/community)
  - 选择Windows版本下载MSI安装包
2. 安装MongoDB
  - [安装教程](https://www.runoob.com/mongodb/mongodb-window-install.html)
3. 配置环境变量
  - 设置->搜索编辑系统环境变量并打开->环境变量->系统变量->点击Path->编辑->新建->添加MongoDB的安装路径（如：`C:\Program Files\MongoDB\Server\8.2\bin`）->确定
4. 启动MongoDB服务
  - 安装完成后，MongoDB服务会自动启动
  - 可以通过以下命令验证MongoDB是否运行
  ```bash
  mongod --version
  ```
  - 如果返回版本信息，则表示MongoDB服务运行正常