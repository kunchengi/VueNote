# Vue学习笔记

## react、vue中的key

### 作用

- 提供虚拟DOM的唯一标识
- 在Vue的列表渲染中，key 属性为每个列表项提供了一个唯一的标识符，用于Vue的虚拟DOM diff算法。
- 当数据更新时，Vue会根据新的数据生成新的虚拟DOM，并根据key比较新旧虚拟DOM的差异，在真实DOM中只需要更新差异部分。

### 对比规则

- 旧虚拟DOM中找到了与新虚拟DOM相同的key
    - 若虚拟DOM中内容没变, 直接使用之前的真实DOM
    - 若虚拟DOM中内容变了, 则生成新的真实DOM，随后替换掉页面中之前的真实DOM
- 旧虚拟DOM中未找到与新虚拟DOM相同的key
    - 创建新的真实DOM，随后渲染到到页面

```mermaid
flowchart TB
    A[列表数据变化] --> B{是否有key?}
    B -->|有key| C[通过key精确匹配]
    B -->|无key| D[按索引顺序比较]
    C --> E[复用匹配的DOM元素]
    C --> F[移动/更新/删除元素]
    D --> G[逐个替换DOM元素]
    E --> H[高效更新]
    F --> H
    G --> I[性能较差]
```

### 使用key

- 不建议使用index索引作为key
  - 若对数据进行：逆序添加、逆序删除等破坏顺序操作
    - 会产生没有必要的真实DOM更新，界面效果没问题, 但效率低。
	- 如果结构中还包含输入类的DOM，会产生错误DOM更新，导致界面更新有问题
    - 仅作展示，使用index作为key是没有问题的

![使用index作为key](./imgs/使用index作为key.png)

- 建议使用唯一标识作为key，如id

![使用唯一标识作为key](./imgs/使用唯一标识作为key.png)

### index为key时输入框更新错误问题

- 核心原因
  - Vue只会更新文本内容，不会重新创建input元素
```html
<div id="root">
    <!-- 使用index作为key，当有输入框时，会导致界面更新错误 -->
        <div class="list">
        <button v-on:click="addUser">点击插入</button>
        <div class="item item4" v-for="(item, index) in userList" :key="index">
            <input type="text">
            <span>{{item.name}}</span>
        </div>
    </div>
</div>
<script type="text/javascript">
    new Vue({
        el:"#root",
        data:{
            userList: [
                {id:1, name:"张三"},
                {id:2, name:"李四"},
                {id:3, name:"王五"}
            ]
        },
        methods:{
            addUser(){
                this.userList.unshift({id:4, name:"老刘"})
            }
        }
    })
    a = [].unshift
</script>
```

- 初始状态
```js
    userList: [
    {id:1, name:"张三"},  // key=0
    {id:2, name:"李四"},  // key=1  
    {id:3, name:"王五"}   // key=2
    ]
```
![index为key输入框1](./imgs/index为key输入框1.png)
- 插入"老刘"后（使用unshift在开头插入）
```js
  userList: [
    {id:4, name:"老刘"},  // key=0
    {id:1, name:"张三"},  // key=1
    {id:2, name:"李四"},  // key=2
    {id:3, name:"王五"}   // key=3
  ]
```
- 由于使用了index作为key，Vue会这样比较
```
  旧的虚拟DOM          新的虚拟DOM
  key=0: 张三          key=0: 老刘    → Vue认为是"同一个元素"，只更新文本
  key=1: 李四          key=1: 张三    → Vue认为是"同一个元素"，只更新文本(输入框还在这)
  key=2: 王五          key=2: 李四    → Vue认为是"同一个元素"，只更新文本
                      key=3: 王五    → 新增元素
```
- 结果,理应显示在第三个输入框中的李四,却显示在第二个输入框中
![index为key输入框2](./imgs/index为key输入框2.png)

## cookie入狱教程

![cookie入狱教程](./imgs/cookie入狱教程.png)

- 安装cookie-editor浏览器插件
- 登录某个网站
- 打开cookie-editor插件
- 点击export按钮导出

![cookie-editor插件导出](./imgs/cookie-editor插件导出.png)

- 打开其他浏览器，进入某个网站
- 打开cookie-editor插件
- 点击import按钮导入之前导出的cookie

![cookie-editor插件导入](./imgs/cookie-editor插件导入.png)

- 将内容粘贴到输入框导入

![cookie-editor插件粘贴](./imgs/cookie-editor插件粘贴.png)

- 刷新即可登录成功

# Vue脚手架

- Vue 脚手架是Vue 官方提供的标准化开发工具（开发平台）
- [Vue CLI文档](https://cli.vuejs.org/zh/)

## 脚手架安装

- 全局安装Vue CLI
```bash
    npm install -g @vue/cli
```

## 脚手架创建项目

### 使用命令行创建项目

- 创建项目
```bash
    vue create 项目名
```
- 选择配置
  - Vue3默认配置（Vue3 + Babel + ESLint）
  - Vue2默认配置（Vue2 + Babel + ESLint）
  - 手动配置（一般选这个）
- 手动配置按需选择配置，按空格切换选中状态
  - Babel
  - TypeScript
  - Progressive Web App (PWA) Support
  - Router
  - Vuex
  - CSS Pre-processors
  - Linter / Formatter
  - Unit Testing
  - E2E Testing
- 选择版本
  - 3.x
  - 2.x
- 选择CSS预处理器
  - Sass/SCSS (with node-sass)
  - Less
  - Stylus
- 选择ESLint配置
  - ESLint with error prevention only（仅检查错误）
  - Airbnb（Airbnb代码规范）
  - Standard（Standard代码规范）
  - None（不使用ESLint）
- 选择Lint的特征
  - Lint on save（保存时检查）
  - Lint and fix on commit（提交时检查并修复）
- 选择配置文件
  - In dedicated config files（独立配置文件）
  - In package.json（package.json文件）

- 初始化依赖
  - 进入项目目录
  - 安装依赖
```bash
    npm i
```

- 安装依赖
```bash
    npm install xxx
```

### 使用vue可视化面板创建项目

- 打开vue可视化面板
```bash
    vue ui
```
- 点击创建
- 输入创建的目录：D:\文档\project\VueNote\Vue2
- 输入项目名（不能包含大小字母）：vue2clinote
- 选择手动配置项目
- 按需勾选第三方依赖（如：bable、router、linter/formatte、使用配置文件）
- 选择版本：2.x
- 选择ESLint配置：如Standard
- 选择Lint的特征：如Lint on save
- 创建项目
- 填写预设名：vue2clinote_preset

- 安装element/vant
  - 点击插件
  - 点击添加插件
  - 搜索element/vant
  - 选择vue-cli-plugin-element/vue-cli-plugin-vant
  - 点击安装

- 安装axios
  - 点击依赖
  - 点击安装依赖
  - 搜索axios
  - 选择axios
  - 点击安装

- 安装less-loader和less
  - 点击依赖
  - 点击安装依赖
  - 搜索less-loader和less
  - 选择less-loader和less
  - 点击安装
  - less-loader版本过高可能会报错，建议安装6.0版本（npm install less-loader@6.0.0）

### 修改配置

- 修改vue.config.js，打包用
```js
  const { defineConfig } = require('@vue/cli-service')
  module.exports = defineConfig({
    transpileDependencies: true,// Babel转译，将所有代码（包括依赖）转译为兼容的JavaScript代码
    // lintOnSave: false,// 关闭eslint校验
    publicPath: './',// 打包后的静态资源路径
  })
```

### 删除不必要的文件和代码

- 修改App.vue
```vue
    <template>
    <div id="app">
        app根组件
    </div>
    </template>

    <script>

    export default {
    name: 'App',
    }
    </script>

    <style>

    </style>
```

- 清空assets目录
- 清空components目录
- 修改router/index.js（如果有）
```js
  import Vue from 'vue'
  import Router from 'vue-router'

  Vue.use(Router)

  export default new Router({
    routes: [

    ]
  })
```

### 项目运行

- 阅读README.md文件，里面有些各种命令
- 运行项目
```bash
    npm run serve
```

### vue脚手架项目的目录结构说明

- node_modules：项目依赖的模块
- public：静态资源目录
  - favicon.ico: 页签图标
  - index.html：主页面
- src：项目的源代码目录
  - assets：静态资源目录
  - components：组件目录
  - router：路由目录
  - store：状态管理目录
  - utils：工具函数目录
  - views：视图组件目录
  - App.vue：根组件
  - main.js：入口文件
- .gitignore：git忽略文件
- babel.config.js：babel配置文件
- package-lock.json：依赖锁定文件
- package.json：项目依赖配置文件
- README.md：项目说明文件

# Vue UI 组件库

## PC 端常用UI 组件库

- [element-ui](https://element.eleme.cn/#/zh-CN/component/installation)
- [iviewui](https://www.iviewui.com/)

## 移动端常用UI 组件库

- [vant](https://vant-ui.github.io/vant/#/zh-CN)
- [mint-ui](https://mint-ui.github.io/docs/#/zh-cn2)
- [cube-ui](https://didi.github.io/cube-ui/#/zh-CN)

# 路由

## 路由简介

### 作用

- 将url映射到UI组件，用于构建单页面应用（SPA）
- 实现页面间的无刷新跳转
- 管理浏览器历史记录
- 实现嵌套路由和路由参数传递
- 提供导航守卫等功能

### SPA 应用

- 单页Web 应用（single page web application，SPA）
- 整个应用只有一个完整的html页面
- 点击页面中的导航链接不会刷新页面，只会做页面的局部更新
- 数据需要通过ajax 请求获取

## hash路由和history路由

### Hash路由(HashRouter)

- 地址中带#号，例如：http://localhost:3000/#/home
- 实现机制：当URL中的 # 后面的部分发生变化时，浏览器不会向服务器发送请求，而是触发 hashchange 事件。React Router 监听这个事件并更新页面内容。
- 优点：
  - 简单易用：不需要服务器端配置，适用于静态网站。
  - 兼容性好：支持所有浏览器。
- 缺点：
  - SEO 不友好：因为 URL 中包含 #，所以无法被搜索引擎收录。
  - URL 不美观：因为 URL 中包含 #，所以 URL 不美观。

### History路由(BrowserRouter)

- 地址中不带#号，例如：http://localhost:3000/home
- 实现机制：
  - 当用户点击链接时，React Router 会拦截事件，然后使用 history.pushState 或 history.replaceState 方法来修改URL并更新浏览器的历史记录
  - 监听到路由变化时，React Router 会找到当前路由对应的组件。
  - 然后调用组件的 componentDidMount 或 componentWillReceiveProps 方法，并更新页面内容。
- 优点：
  - SEO 友好：因为 URL 中不包含 #，所以可以被搜索引擎收录，有利于SEO优化。
  - URL 美观：因为 URL 中不包含 #，所以 URL 更美观。
- 缺点：
  - 需要服务器端配置：为了确保刷新页面或直接访问某个路由时，服务器能够正确返回应用的HTML文件，需要进行相应的服务器端配置。
  - 不支持IE9及以下版本：因为 History 路由需要使用 HTML5 的 history API，而IE9及以下版本不支持该API。
- 如果你选择使用History路由，需要在服务器端进行相应的配置。以下是一些常见服务器的配置示例：
  - Nginx：
    ```nginx
      server {
        listen 80;
        server_name example.com;

        location / {
          try_files $uri $uri/ /index.html;
        }
      }
    ```
  - Apache：
    ```apache
      <IfModule mod_rewrite.c>
      RewriteEngine On
      RewriteBase /
      RewriteRule ^index\.html$ - [L]
      RewriteCond %{REQUEST_FILENAME} !-f
      RewriteCond %{REQUEST_FILENAME} !-d
      RewriteRule . /index.html [L]
      </IfModule>
    ```
  - Node.js (Express)：
    ```javascript
      const express = require('express');
      const path = require('path');
      const app = express();

      app.use(express.static(path.join(__dirname, 'build')));

      app.get('-', (req, res) => {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
      });

      app.listen(3000);
    ```
### HashRouter 和 BrowserRouter 的区别

- 底层实现方式不同：
  - HashRouter 使用 URL 的 hash 部分作为路由标识。
  - BrowserRouter 使用 HTML5 的 history API，不兼容IE9及以下版本。
- url 的格式不同：
  - HashRouter 的url包含#，例如：http://localhost:3000/#/home。
  - BrowserRouter 的url不包含#，例如：http://localhost:3000/home。
- 刷新后对路由state参数的影响：
  - HashRouter 在刷新页面后，路由state参数会丢失。
  - BrowserRouter 在刷新页面后，路由state参数不会丢失，因为路由组件的state参数是保存在浏览器的history对象中的。

# vite简介

- 前端构建工具
- [vite官网](https://vitejs.cn/)
- 优点
  - 轻量快速的热重载（HMR），能实现极速的服务启动
  - 对TypeScript、JSX、CSS支持开箱即用
  - 真正的按需编译，不再等待整个应用编译完成

## webpack构建流程

![webpack构建流程图](./imgs/webpack构建流程图.png)
- 在服务启动前分析处理所有文件
- 如果路由多，构建时间会变长

## vite构建流程

![vite构建流程图](./imgs/vite构建流程图.png)
- 先启动服务，然后按需处理文件

# vite创建Vue项目

- 创建vue项目
```bash
  npm create vite@latest
```
- 输入y
- 配置项目名称
  - 输入项目名称，例如：vite-project
- 选择开发框架
  - Vue
- 选择语言
  - TypeScript
- 是否使用rolldown-vite
  - No
- 是否使用npm安装并立即开始
  - Yes

# Vue插件

- Vue Language Features (Volar)
- TypeScript Vue Plugin (Volar)