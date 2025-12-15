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
│   │   └── appConfig.js    # 应用配置
│   ├── controllers/
│   │   ├── hospitalController.js  # 医院控制器
│   │   ├── dictController.js      # 字典控制器
│   │   └── smsController.js       # 短信验证码控制器
│   ├── routes/
│   │   └── dictRoutes.js          # 字典路由
│   ├── services/
│   │   ├── hospitalService.js     # 医院服务
│   │   └── dictService.js         # 字典服务
│   └── utils/
│       └── responseUtils.js       # 响应工具函数
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

## 许可证

ISC
