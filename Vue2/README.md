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

# 模板语法

- Vue模板语法有2大类：
  - 插值语法
    - （双大括号表达式）
    - 用于解析标签体内容
    - {{xxx}} ，xxx 会作为js 表达式解析
  - 指令语法
    - （v-xxx）
    - 解析标签属性、解析标签体内容、绑定事件
    - v-bind:href = 'xxx' ，xxx 会作为js 表达式被解析
```html
  <div id="root">
      <!-- 插值语法 -->
      <h1>{{userInfo.name}}</h1>
      <!-- 指令语法 -->
      <a v-bind:href="userInfo.github">github</a>
      <!-- v-bind的简写 -->
      <a :href="userInfo.github">github简写</a>
  </div>
  <script type="text/javascript">
      //全局配置，阻止 vue 在启动时生成生产提示
      Vue.config.productionTip = false;
      new Vue({
          el:"#root",
          data:{
              userInfo: {
                  name:"KenSen",
                  age:18,
                  github:"https://github.com/kunchengi"
              }
          }
      });
  </script>
```

[模板语法](./page/模板语法.html)

![模板语法](./imgs/模板语法.png)

# 数据绑定

- Vue中有2种数据绑定的方式
  - 单向绑定(v-bind)
    - 数据只能从data流向页面
    - 数据更新会驱动UI更新，但是UI更新不会驱动数据更新
    - 语法：v-bind:xxx = 'xxxx' ，xxxx 是data中的属性，xxx 是元素中的属性
    - 简写：:xxx = 'xxxx'
  - 双向绑定(v-model)
    - 数据既能从data流向页面，又能从页面流向data
    - UI更新会驱动数据更新，数据更新也会驱动UI更新
    - 语法：v-model:xxx = 'xxxx' ，xxxx 是data中的属性，xxx 是元素中的属性
    - v-model只能用在表单类元素上（如：input、select等）
    - v-model:value 可以简写为 v-model，因为v-model默认收集的就是value值
```html
  <div id="root">
      <!-- 普通写法 -->
      <input type="text" v-bind:value="name"><br/>
      <input type="text" v-model:value="name"><br/>

      <!-- 简写 -->
      <input type="text" :value="name"><br/>
      <input type="text" v-model="name"><br/>
      <button v-on:click="name = '张三'">点击修改name值</button>

      <!-- 以下代码是错误的，因为v-model只能应用在表单类元素（输入类元素）上 -->
      <!-- <h2 v-model:x="name">你好啊</h2> -->
  </div>
  <script src="https://cdn.bootcdn.net/ajax/libs/vue/2.7.9/vue.common.dev.js"></script>
  <script type="text/javascript">
      //全局配置，阻止 vue 在启动时生成生产提示
      Vue.config.productionTip = false;
      new Vue({
          el:"#root",
          data:{
              name:"KenSen"
          }
      });
  </script>
```

[数据绑定](./page/数据绑定.html)

![数据绑定](./imgs/数据绑定.png)

# el与data的两种写法

- el的两种写法
  - 方式一：new Vue时候配置el属性
  - 方式二：先创建Vue实例，随后再通过$mount('#root')指定el
- data的两种写法
  - 对象式
  - 函数式
  - 目前哪种写法都可以，以后学习到组件时，data必须使用函数式，否则会报错
- 由Vue管理的函数，一定不要写箭头函数，一旦写了箭头函数，this就不再是Vue实例了
```js
  new Vue({
      // 方式一：new Vue时候配置el属性
      el:"#root",
      // 对象式
      data:{
          name:"KenSen"
      }
  });
  // 方式二：先创建Vue实例，随后再通过$mount('#root')指定el
  new Vue({
      // 函数式
      data(){
          console.log(this);// 此处的this是Vue实例
          return {
              name:"KenSen"
          }
      }
  }).$mount('#root');
```
[el与data的两种写法](./page/el与data的两种写法.html)

## MVVM模型

- M：模型(Model)
  - 数据层
  - 对应Vue中的data数据
- V：视图(View)
  - 视图层
  - 对应Vue中的模板
- VM：视图模型(ViewModel)
  - 连接M和V的桥梁
  - 对应Vue中的Vue实例

![MVVM模型](./imgs/MVVM模型.png)

- data中所有的属性，最后都出现在了vm身上
- vm身上所有的属性 及 Vue原型上所有属性，在Vue模板中都可以直接使用

# Vue2中的数据代理

- 通过vm对象来代理data对象中属性的操作（读/写）
- Vue2中的数据代理是通过Object.defineProperty()方法来实现的
- Vue中数据代理的好处
  - 更方便的操作data中的数据
- 基本原理
  - 通过Object.defineProperty()把data对象中所有属性添加到vm上
  - 为每一个添加到vm上的属性，都指定一个getter/setter
  - 在getter/setter内部去操作data中对应的属性

![Vue2数据代理](./imgs/Vue2数据代理.png)

# 事件处理

## 事件的基本使用

- 使用v-on:xxx 或 @xxx 绑定事件，其中xxx是事件名
- @click="demo" 和 @click="demo()" 效果一致
- @click="demo($event, 666)" 中如果同时传入了$event，则会被解析为原生事件对象
- methods对象
  - 是一个Vue实例对象，用于给Vue实例对象添加方法，但不会做数据代理
  - 事件的回调需要配置在methods对象中，最终会在vm上
  - methods中配置的函数，都是被Vue所管理的函数，this的指向是vm 或 组件实例对象，不要用箭头函数！否则this就不是vm了
  - 如果将方法写到data里，也能使用，但是会做数据代理，可能会降低性能

```html
  <div id="root">
      <button v-on:click="showInfo">v-on点我提示信息,不传参</button>
      <button @click="showInfo">@click点我提示信息1不传参,简写形式</button>
      <button @click="showInfo1(66)">点我提示信息2,传参，但不传事件对象</button>
      <button @click="showInfo2($event,66)">点我提示信息2,传参，传事件对象</button>
  </div>
  <script src="https://cdn.bootcdn.net/ajax/libs/vue/2.7.9/vue.common.dev.js"></script>
  <script type="text/javascript">
      Vue.config.productionTip = false;
      new Vue({
          el:"#root",
          data:{
              name:"KenSen"
          },
          methods:{
              showInfo(){
                  console.log('this',this);//此处的this是Vue实例
                  console.log('showInfo');// showInfo
              },
              showInfo1(number){
                  console.log('number',number);// 66
              },
              showInfo2(event,number){
                  console.log('event',event);// 事件对象
                  console.log('number',number);// 66
              }
          }
      });
  </script>
```

[事件的基本使用](./page/事件的基本使用.html)
