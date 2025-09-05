# 简介

- 动态构建用户界面的渐进式 JavaScript 框架

## 特点

- 采用组件化模式
  - 提高代码复用率，让代码更好的维护
- 声明式编码
  - 让编码人员无需直接操作 DOM，提高开发效率
- 使用虚拟 DOM 和优秀的 Diff 算法，尽可能提高性能
- 遵循 MVVM 模式
- 编码简洁, 体积小, 运行效率高, 适合移动/PC 端开发
- 它本身只关注 UI, 也可以引入其它第三方库开发项目

## 与其它 JS 框架的关联

- 借鉴 Angular 的模板和数据绑定技术
- 借鉴 React 的组件化和虚拟 DOM 技术

# 搭建Vue学习环境

- vue.js引入
  - [vue.js](https://cdn.bootcdn.net/ajax/libs/vue/2.7.9/vue.common.dev.js)
- 谷歌安装devtools插件
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?utm_source=ext_app_menu)
- vscode插件
  - live server
  - Vue 3 Snippets

[学习环境搭建](./page/学习环境搭建.html)

# 创建Vue实例并绑定UI

- 创建一个根元素，并指定一个id，一般为root。该元素称为`Vue容器`
```html
  <body>
    <div id="root">
    </div>
  </body>
```

- 创建一个Vue实例，并传入一个配置对象
- 配置对象的属性
  - el：用于指定当前Vue实例为哪个容器服务，值通常为css选择器字符串，一般为#root
  - data：用于存储数据。数据供el所指定的容器去使用，值暂时写成对象
  - 当data中的数据发生改变，页面中用到该数据的UI也会自动更新
```js
  //创建vue实例，传入配置对象
  new Vue({
      el:"#root",// el用于指定当前Vue实例为哪个容器服务，值通常为css选择器字符串
      // el:document.getElementById("root");//可以这么写，但一般不这么写
      // data数据，用于存储数据。数据供el所指定的容器去使用，值暂时写成对象
      data:{
          name:"KenSen",
          age:18
      }
  });
```

## 相关概念

- Vue容器里的代码依然符合html规范，只不过混入了一些特殊的Vue语法
- Vue容器里的代码被称为`Vue模板`
- Vue实例和Vue容器是一一对应的
- 真实开发中只有一个Vue实例，并且会配合着组件一起使用

[创建Vue实例并绑定UI](./page/创建Vue实例并绑定UI.html)
![创建Vue实例并绑定UI](./imgs/创建Vue实例并绑定UI.png)