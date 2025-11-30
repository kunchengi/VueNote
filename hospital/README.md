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