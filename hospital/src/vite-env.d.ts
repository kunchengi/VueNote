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
