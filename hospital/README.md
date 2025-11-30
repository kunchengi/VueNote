# 医院挂号项目

## pnpm + vite创建vue项目

- pnpm + vite创建项目
```bash
  pnpm create vite
  # 输入项目名称
  # hospital
  # 选择开发框架
  # Vue
  # 选择语言
  # TypeScript
  # 是否使用rolldown-vite
  # No
  # 是否使用npm安装并立即开始
  # Yes
```

- 删除无关文件

## 项目配置

### 启动后自动打开浏览器

- 在`package.json`中添加`"scripts": { "dev": "vite --open" }`
```json
  {
    "scripts": {
      "dev": "vite --open"
    }
  }
```

### 创建类型声明文件

- 可以解决TypeScript 无法识别 .vue 文件类型的问题，使得在导入和使用 Vue 组件时能够获得正确的类型检查和代码提示。
- 在`src`目录下创建`vite-env.d`文件
- 内容如下
```typescript
  // TypeScript 的三斜线指令，用于引入 Vite 官方提供的客户端类型定义，这使得项目能够正确识别 Vite 相关的环境变量、模块和 API 的类型。
  /// <reference types="vite/client" />

  // 任何以 .vue 结尾的文件都可以作为模块导入
  // 导入的组件具有 DefineComponent 类型，这是 Vue 3 组件的基础类型
  // 导出的默认值就是这个组件
  declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
  }
```

## 搭建静态页面

- 准备好静态资源文件

### 使用sass

- 安装sass
```bash
  pnpm add sass
```

- [清除默认样式](https://www.npmjs.com/package/reset-scss?activeTab=code)

- 顶部组件静态页面搭建
- 路由区域静态页面搭建
- 底部组件静态页面搭建

### 项目路由的搭建与滚动行为

- 安装路由
```bash
  pnpm add vue-router
```

- 编写路由配置文件
  - 使用路由懒加载
- 挂载路由
- 配置滚动行为
  - 控制跳转路由时，滚动条的位置

### 首页静态页面搭建

#### 使用element-plus

- 安装element-plus
```bash
  pnpm add element-plus
```

- main.ts引入和挂载element-plus即可在组件中使用
```typescript
  // 引入element-plus
  import ElementPlus from 'element-plus'
  import 'element-plus/dist/index.css'
  // 挂载element-plus
  app.use(ElementPlus)
```

- Volar 支持
  - 如果您使用 Volar，请在 tsconfig.json 中通过 compilerOptions.type 指定全局组件类型。
```json
  {
    "compilerOptions": {
      "types": ["element-plus/global"]
    }
  }
```

- reset.scss需要排除element-plus的样式

- 首页轮播图组件静态页面搭建

- 安装element的icon组件
```bash
  pnpm add @element-plus/icons-vue
```

- 首页医院搜索框组件静态页面搭建

- 深度选择器
  - 解决element-plus组件样式覆盖问题
```css
  :deep(.el-autocomplete){
      width: 600px;
      margin-right: 10px;
  }
```