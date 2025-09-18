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

- 数据和UI的绑定,当数据发生改变，页面中用到该数据的UI也会自动更新
- data中的数据是可以深度绑定的,比如data中的user属性是对象,当user的对象内部的属性发生改变，页面中用到该数据的UI也会自动更新
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
    - 在 Vue 2 中，使用 v-model 绑定 input 元素时，默认情况下 input 的值会被当作字符串（string）处理。
    - 即使在 input 上设置了 type="number"，v-model 依然会把输入的内容当作字符串来存储到 data 里的 firstNumber 和 secondNumber。
    - 解决办法：使用v-model.number
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

## 事件修饰符

- prevent
  - 阻止事件的默认行为
  - 相当于event.preventDefault()

- stop
  - 阻止事件冒泡
  - 相当于event.stopPropagation()

- once
  - 事件只触发一次

- 修饰符可以连着写，有先后顺序
  - @click.prevent.stop.once = "demo"

- capture
  - 事件捕获阶段触发

- self
  - 事件只触发自身

- passive
  - 事件的默认行为立即执行，无需等待事件回调执行完毕

```html
    <div id="root">
        <!-- 原生js阻止默认事件 -->
        <a href="http://www.atguigu.com" @click="showInfo($event)">原生js阻止默认事件</a>
        <!-- prevent修饰符阻止默认事件 -->
        <a href="http://www.atguigu.com" @click.prevent="showMsg(66)">prevent修饰符阻止默认事件</a>
        <!-- 原生js阻止事件冒泡 -->
        <div class="demo1" @click="showInfo($event)">
            <button @click="showInfo($event)">原生js阻止事件冒泡</button>
        </div>  
        <!-- stop修饰符阻止事件冒泡 -->
        <div class="demo1" @click="showInfo">
            <button @click.stop="showInfo">stop修饰符阻止事件冒泡</button>
            <!-- 修饰符可以连续写 -->
            <!-- <a href="http://www.atguigu.com" @click.prevent.stop="showInfo">点我提示信息</a> -->
        </div>
        <!-- once事件只触发一次 -->
        <button @click.once="showInfo">once事件只触发一次</button>
        <!-- capture使用事件的捕获模式，捕获阶段开始处理事件 -->
        <div class="box1" @click.capture="showMsg(1)">
            capture使用事件的捕获模式，捕获阶段开始处理事件
            <div class="box2" @click="showMsg(2)">
                div2
            </div>
        </div>
        <!-- self只有event.target是当前操作的元素时才触发事件 -->
        <div class="demo1" @click.self="showInfo">
            <button @click="showInfo">self只有event.target是当前操作的元素时才触发事件</button>
        </div>
        <!-- @wheel是鼠标滚轮滚动事件，事件的默认行为立即执行，无需等待事件回调执行完毕； -->
        <ul @wheel.passive="demo" class="list">
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
        </ul>
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
                showInfo(e){
                    //原生js阻止浏览器默认行为
                    e.preventDefault();
                    //原生js阻止事件冒泡
                    e.stopPropagation();
                    console.log('showInfo');
                },
                showMsg(msg){
                    console.log(msg);
                },
                demo(){
                    console.log('demo');
                }
            }
        });
    </script>
```

[事件修饰符](./page/事件修饰符.html)

## 键盘事件

- Vue中常用的按键别名
  - 回车 => enter
  - 删除 => delete (捕获“删除”和“退格”键)
  - 退出 => esc
  - 空格 => space
  - 换行 => tab (特殊，必须配合keydown去使用)
  - 上 => up
  - 下 => down
  - 左 => left
  - 右 => right

- 系统修饰键（用法特殊）：ctrl、alt、shift、meta
  - 配合keyup使用时
    - 按下修饰键的同时，再按下其他键，随后释放其他键，事件才被触发
  - 配合keydown使用
    - 正常触发事件
- 也可以使用keyCode去指定具体的按键（不推荐）
- 自定义按键别名
  - 在Vue.config.keyCodes中自定义按键别名
  - 自定义别名建议使用全小写，否则可能不生效
```html
  <div id="root">
      <input type="text" placeholder="按下键盘就会触发事件" @keydown="showInfo">
      <input type="text" placeholder="按下回车键就会触发事件" @keydown.enter="showInfo">
      <input type="text" placeholder="按下F9键就会触发事件" @keydown.fnine="showInfo">
      <input type="text" placeholder="按下Ctrl+Y键就会触发事件" @keyup.ctrl.y="showInfo">
  </div>
  <script src="https://cdn.bootcdn.net/ajax/libs/vue/2.7.9/vue.common.dev.js"></script>
  <script type="text/javascript">
      Vue.config.productionTip = false;
      // 自定义F9按键别名
      Vue.config.keyCodes.fnine = 120;
      console.log(Vue.config.keyCodes);
      new Vue({
          el:"#root",
          data:{
              name:"KenSen"
          },
          methods:{
              showInfo(e){
                  console.log(e.key,e.keyCode);
              }
          }
      });
  </script>
```

[键盘事件](./page/键盘事件.html)

# 计算属性

- 求和案例
  - 当输入框的值发生改变，实时显示求和的结果

- 通过已有的属性，计算出一个新的属性
- 原理
  - 借助了Objcet.defineproperty方法提供的getter和setter，当数据发生改变时，会自动调用getter和setter，重新计算出一个新的属性
- 计算属性的函数执行时机
  - 初次读取时会执行一次
  - 当依赖的数据发生改变时会被再次调用
- 优势
  - 与其它实现方式相比，内部有缓存机制（复用），效率更高，调试方便
- 计算属性最终会出现在vm上，直接读取使用即可
- 如果计算属性要被修改，那必须写set函数去响应修改，且set中要引起计算时依赖的数据发生改变
- 使用
  - 通过computed配置项给vm添加计算属性
  - computed是对象，对象中配置的属性称为计算属性
  - 计算属性需要配置get方法，get方法需要返回计算后的结果
  - 计算属性可以被修改，必须写set方法，set方法需要传入修改后的值。且要在set中更新依赖的数据
  - 当计算属性不需要set方法时，可以简写成一个函数，返回计算后的结果，相当于get方法
```html
  <div id="root">
      <input type="number" v-model.number="firstNumber">
      <input type="number" v-model.number="secondNumber">
      <span>{{sum}}</span>
      <button @click="sum++">点我sum加1</button>
  </div>
  <script src="https://cdn.bootcdn.net/ajax/libs/vue/2.7.9/vue.common.dev.js"></script>
  <script type="text/javascript">
      Vue.config.productionTip = false;
      new Vue({
          el:"#root",
          data:{
              firstNumber:0,
              secondNumber:0
          },
          // 计算属性
          computed:{
              // 定义sum计算属性
              sum:{
                  // 定义sum的get方法，初次读取时会执行一次，当依赖的数据发生改变时会被再次调用
                  get(){
                      return this.firstNumber + this.secondNumber;
                  },
                  // 定义sum的set方法，当sum被修改时会执行
                  set(value){
                      this.firstNumber = value - this.secondNumber;
                  }
              }
          }
      });
  </script>
```

[计算属性](./page/计算属性.html)

![计算属性实现求和](./imgs/计算属性实现求和.png)

# 监视属性

- 作用
  - 当被监视的属性变化时，会自动执行监视属性中的函数
  - 与计算属性不同，当数据发生变化时,watch可以执行异步操作,处理复杂的逻辑

## 浅监视

- 可以监视data/computed中的属性
- 监视的两种写法
  - new Vue时传入watch配置
  - 通过vm.$watch(属性名，回调)
- 浅监视只会监视data/computed属性的属性值，如果属性值是一个对象，那么只会监视对象最外层属性的变化，属性的属性值变化时，不会触发监视属性中的handler函数。类似浅拷贝
- immediate为true时，初始化时会调用handler函数
```js
  const vm = new Vue({
      el: "#root",
      data: {
          isHot: true,
          user: {
              name: '张三',
              age: 18
          }
      },
      computed: {
          weather() {
              return this.isHot ? '炎热' : '凉爽';
          }
      },
      methods: {
          changeWeather() {
              this.isHot = !this.isHot;
          },
          changeUser() {
              this.user = {
                  name: '王五',
                  age: 20
              }
          },
          addAge() {
              this.user.age++;
          }
      },
      // 监视属性写法1
      watch: {
          // 监视isHot数据的变化
          isHot: {
              immediate: true, // 初始化时让handler调用一下
              // handler函数：当isHot发生改变时被调用
              handler(newValue, oldValue) {
                  console.log('isHot被修改了', newValue, oldValue);
              }
          },
          // 监视计算属性weather的变化
          weather: {
              handler(newValue, oldValue) {
                  console.log('天气变化了', newValue, oldValue);
              }
          },
          // 监视对象属性的变化
          user: {
              handler(newValue, oldValue) {
                  console.log('用户数据被修改了', newValue, oldValue);
              }
          }
      }
  });
  // 监视属性写法2
  // vm.$watch('isHot',{
  //     handler(newValue, oldValue) {
  //         console.log('isHot被修改了', newValue, oldValue);
  //     }
  // })
  // vm.$watch('weather',{
  //     handler(newValue, oldValue) {
  //         console.log('天气变化了', newValue, oldValue);
  //     }
  // })
```

[浅监视](./page/浅监视.html)
![浅监视](./imgs/浅监视.png)

## 深度监视

- 监视对象中的属性值，如果属性值是一个对象，那么会监视对象中的属性值，属性值是一个对象，那么会继续监视对象的属性值，以此类推，会进行深度监视
- 在配置项中添加deep: true即可
```js
  watch: {
      // 监视对象属性的变化
      user: {
          // 深度监视
          deep: true,
          handler(newValue, oldValue) {
              console.log('用户数据被修改了', newValue, oldValue);
          }
      }
  }
```

[深度监视](./page/深度监视.html)
![深度监视](./imgs/深度监视.png)

## 监视属性的简写

- 如果不需要深度监视，可以不写配置，简写为函数形式
- 监视属性写法1和写法2的写法可以进行简写
```js
  const vm = new Vue({
      el: "#root",
      data: {
          isHot: true,
      },
      computed: {
          weather() {
              return this.isHot ? '炎热' : '凉爽';
          }
      },
      methods: {
          changeWeather() {
              this.isHot = !this.isHot;
          }
      },
      // 监视属性简写1
      watch: {
          // 监视isHot数据的变化
          isHot(newValue, oldValue){
              console.log('isHot被修改了', newValue, oldValue);
          }
      }
  });
  // 监视属性简写2
  // vm.$watch('isHot', function(newValue, oldValue) {
  //     console.log('isHot被修改了', newValue, oldValue);
  // });
```

[监视属性的简写](./page/监视属性的简写.html)

## watch与computed对比

- computed能完成的功能，watch都可以完成
- computed有缓存，watch没有缓存
- watch能完成的功能，computed不一定能完成，比如异步逻辑
```js
  watch: {
      // 监视属性完成异步操作，1秒后再更新天气
      isHot(newValue, oldValue){
          setTimeout(() => {
            this.weather = newValue ? '炎热' : '凉爽';
          },1000)
      }
  }
```

## vue中的普通函数和箭头函数

- 所被Vue管理的函数，要写成普通函数，这样this的指向才是vm 或 组件实例对象。
- 所有不被Vue所管理的函数（定时器的回调函数、ajax的回调函数等、Promise的回调函数），最好写成箭头函数，这样this的指向才是vm 或 组件实例对象

# 样式绑定

- 用于绑定和修改元素的class和style属性，实现动态切换样式

## class 绑定

- 语法1：`:class="className"`
  - className为样式类名
- 语法2：`:class="{className:isA,className2:isB,className3:isC,...}"`
  - className、className2、className3...为样式类名
  - isA、isB、isC...为布尔值，为元素的class是否生效
- 语法3：`:class="[className,className2,className3]"`
  - className、className2、className3...为样式类名

## style 绑定

- 语法1：`:style="{fontSize: xxx}"`
  - xxx为vue中的变量
- 语法2：`:style="[obj1,obj2]"`
  - obj1、obj2为对象，为元素的style属性

```html
  <div id="root">
      <button @click="changeMood">切换box1样式</button><br/>
      <div class="basic" :class="mood" @click="changeMood">box1</div> <br/>
      <div class="basic" :class="classArr">box2</div> <br/>
      <button @click="changeShadow">切换box3的字体阴影</button><br/>
      <div class="basic" :class="classObj">box3</div> <br/>
      <button @click="changeFontSize">切换box4、box5的字体大小</button><br/>
      <div class="basic" :style="styleObj">box4</div> <br/>
      <div class="basic" :style="styleArr">box5</div>
  </div>
  <script src="https://cdn.bootcdn.net/ajax/libs/vue/2.7.9/vue.common.dev.js"></script>
  <script type="text/javascript">
      Vue.config.productionTip = false;
      new Vue({
          el:"#root",
          data:{
              mood: 'normal',
              isShadow: false,
              styleSize: 30,
              classArr: ['bgColor', 'textShadow', 'borderRadius'],
          },computed: {
              classObj() {
                  return {
                      bgColor: true,
                      textShadow: this.isShadow,
                      borderRadius: true
                  }
              },
              styleObj() {
                  return {
                      color: 'red',
                      fontSize: `${this.styleSize}px`
                  }
              },
              styleArr() {
                  return [{color: 'red'}, {fontSize: `${this.styleSize}px`}]
              }
          },
          methods: {
              changeMood() {
                  const arr = ['happy', 'sad', 'normal'];
                  const index = arr.findIndex(item => item === this.mood);
                  this.mood = arr[(index + 1) % 3];
              },
              changeShadow() {
                  this.isShadow = !this.isShadow;
              },
              changeFontSize() {
                  this.styleSize += 2;
              }
          }
      });
  </script>
```

[样式绑定](./page/样式绑定.html)

![样式绑定](./imgs/样式绑定.png)

# 条件渲染

## 条件渲染语法

- v-if
  - 适用于切换频率较低的场景
  - 不展示的DOM元素直接被移除
  - v-if可以和:v-else-if、v-else一起使用，但要求结构不能被“打断”
  ```html
    <div v-if="isShow">条件渲染</div>
    <div v-else-if="isShow2">条件渲染2</div>
    <div v-else>条件渲染3</div>
  ```

- v-show
  - 切换频率较高的场景
  - 不展示的DOM元素，不会被移除，只会隐藏。即：display: none
  ```html
    <div v-show="isShow">条件渲染</div>
  ```

## v-if和v-show

- v-if和v-show都是用于条件渲染的，但两者之间有区别
  - v-if的元素，在为flase时，DOM元素会被直接移除，所有子节点不会解析
  - v-show的元素，在为flase时，DOM元素不会被移除，只是将元素隐藏，即：display: none
  - 如果需要频繁切换应使用v-show

[条件渲染](./page/条件渲染.html)

![条件渲染](./imgs/条件渲染.png)

# 列表渲染

## 基本列表渲染

- v-for
  - 可遍历：数组、对象、字符串（用的很少）、指定次数（用的很少）
  - key：用于虚拟DOM的优化，作用：当数据更新时，Vue会根据新的数据生成新的虚拟DOM，并比较新旧虚拟DOM的差异，最后将差异同步到真实DOM中
  - key必须在列表中唯一，不要使用索引作为key
```html
  <!-- 渲染数组 -->
  <!--第一个参数p是数组值，第二个参数index是数组索引-->
  <!-- <div class="item item1" v-for="item in userList" :key="item.id">{{item.name}}</div> -->
  <div class="item item1" v-for="(item,index) in userList" :key="item.id">{{item.name}}-{{index}}</div>

  <!-- 渲染对象 -->
  <!--第一个参数value是属性值，第二个参数k是属性名-->
  <div class="item item2" v-for="(value, k) in car" :key="k">{{value}}-{{k}}</div>

  <!-- 渲染字符串 -->
  <!--第一个参数char是字符值，第二个参数index是字符串索引-->
  <div class="item item3" v-for="(item, index) in message" :key="index">{{item}}-{{index}}</div>

  <!-- 渲染数值 -->
  <!--第一个参数number是数值，第二个参数index是数值索引，3是遍历次数-->
  <div class="item item4" v-for="(item, index) in 3" :key="index">{{item}}-{{index}}</div>
```

[基本列表渲染](./page//列表渲染/基本列表渲染.html)
![基本列表渲染](./imgs/基本列表渲染.png)

## 列表过滤案例

- 在搜索框按名字模糊查询，并显示查询结果
```html
  <div id="root">
      <div>
          <input type="text" placeholder="请输入名字" v-model="keyword">
          <h1>监视属性实现</h1>
          <div v-for="item in filterList">
              {{item.name}}-{{item.age}}-{{item.sex}}
          </div>
          <h1>计算属性实现</h1>
          <div v-for="item in filterList1">
              {{item.name}}-{{item.age}}-{{item.sex}}
          </div>
      </div>
  </div>
  <script src="https://cdn.bootcdn.net/ajax/libs/vue/2.7.9/vue.common.dev.js"></script>
  <script type="text/javascript">
      new Vue({
          el:"#root",
          data:{
              keyword:"",
              list:[
                  {id:'001',name:'马冬梅',age:19,sex:'女'},
                  {id:'002',name:'周冬雨',age:20,sex:'女'},
                  {id:'003',name:'周杰伦',age:21,sex:'男'},
                  {id:'004',name:'温兆伦',age:22,sex:'男'}
              ],
              // 监视属性实现，保存过滤结果的数组
              filterList:[]
          },
          watch:{
              // 监视属性实现，监听keyword属性。有值变化时，更新filterList属性
              keyword: {
                  immediate:true,
                  handler(newValue,oldValue){
                      // 获取过滤结果
                      this.filterList = this.list.filter(item => item.name.indexOf(newValue) !== -1)
                  }
              }
          },
          computed:{
              // 计算属性实现，监听keyword属性。有值变化时，更新filterList属性
              filterList1(){
                  return this.list.filter(item => item.name.indexOf(this.keyword) !== -1)
              }
          }
      })
  </script>
```

[列表过滤案例](./page/列表渲染/列表过滤案例.html)

![列表过滤案例](./imgs/列表过滤案例.png)

# Vue2 属性监视机制解析

## 核心原理

- Vue 在初始化时`递归遍历` data 对象的所有属性（包括嵌套对象中的属性）
- 使用 Object.defineProperty() 将每个属性转换为 getter/setter
- 每个组件实例都有对应的 watcher 实例，在属性被访问时收集依赖
- 当属性值变化时，setter 会通知 watcher，从而触发重新渲染
- Vue没有对数组的索引进行getter/setter转换（出于性能考虑），而是通过重写数组的7个方法（push、pop、shift、unshift、splice、sort、reverse）来实现响应式。

[简化版属性监视机制实现](./page/属性监视机制/简化版属性监视机制实现.html)

## 无法检测属性添加

- 直接新增属性，不会驱动UI更新
- 解决方式：使用vm.$set()方法新增属性，会驱动UI更新
```js
  // 直接新增属性，不会驱动UI更新
  this.user.email = 'example@mail.com';
  // 正确做法：使用 Vue.set 或 this.$set
  this.$set(this.user, 'email', 'example@mail.com');
```

## 无法检测属性删除

- 直接删除属性，不会驱动UI更新
- 解决方式：使用vm.$delete()方法删除属性，会驱动UI更新
```js
  // 直接删除属性，不会驱动UI更新
  delete this.user.name;
  // 正确做法：使用 Vue.delete 或 this.$delete
  this.$delete(this.user, 'name');
```

## 数组的限制

- 通过索引替换数组中的元素，不会驱动UI更新
- 直接修改数组的length属性，不会驱动UI更新
- 解决方式1：使用数组的方法修改数组
- 解决方式2：使用vm.$set()方法修改数组
```js
  // 通过索引替换数组中的元素，不会驱动UI更新
  // this.userList[0] = {id:1, name:"老刘", age:18};
  // 直接修改数组的length属性，不会驱动UI更新
  // this.userList.length = 0;
  // 通过数组的方法替换数组中的元素，会驱动UI更新
  // this.userList.splice(0,1,{id:1, name:"老刘", age:18});
  // 通过vm.$set()方法替换数组中的元素，会驱动UI更新
  this.$set(this.userList,0,{id:'1',name:'老刘',age:18});
```

## Vue.set的使用

- Vue.set()方法的使用
  - Vue.set(target, key, value)
  - target: 目标对象
  - key: 要添加的属性名(数组索引或对象属性名)
  - value: 要添加的属性值
```js
  this.$set(this.user, 'email', 'example@mail.com');
  this.$set(this.userList,0,{id:'1',name:'老刘',age:18});
```

## Vue.delete的使用

- Vue.delete()方法的使用
  - Vue.delete(target, key)
  - target: 目标对象
  - key: 要删除的属性名(数组索引或对象属性名)
```js
  this.$delete(this.user, 'email');
  this.$delete(this.userList,0);
```

[vue监视属性机制的问题](./page/属性监视机制/vue监视属性机制的问题.html)

![vue监视属性机制的问题](./imgs/vue监视属性机制的问题.png)

# v-model详解

## 绑定输入框

- 若绑定在输入框上，v-model收集的值和用户输入的值为输入框中的value值
```html
  <input type="text" v-model="name">
```

## 绑定单选框

- 若绑定在单选框上，v-model收集的值和用户选择的值为单选框的value值
```html
  <input type="radio" v-model="sex" value="男">男
  <input type="radio" v-model="sex" value="女">女
```

## 绑定复选框

- 如果绑定的数据为非数组，则v-model将会把绑定数据转换成boolean值，然后绑定给复选框的checked属性
```html
  <input type="checkbox" v-model="isSure">是否同意协议
```
- 如果绑定的数据为数组，则v-model会把复选框选中的value值收集到数组中
```html
  <input type="checkbox" v-model="hobby" value="篮球">篮球
  <input type="checkbox" v-model="hobby" value="足球">足球
```

## v-model的三个修饰符

- .lazy
  - 失去焦点时才会更新数据
```html
  <input type="text" v-model.lazy="name">
```
- .number
  - 自动将用户输入的值转换为数字类型
```html
  <input type="text" v-model.number="age">
```
- .trim
  - 自动过滤用户输入的首尾空格
```html
  <input type="text" v-model.trim="name">
```

[v-model详解](./page/v-model详解.html)

![v-model详解](./imgs/v-model详解.png)

# 过滤器

- 过滤器的作用
  - 对要显示的数据进行特定格式化后再显示
  - 过滤器可以用在两个地方：{{}}插值表达式和v-bind表达式
  - 并没有改变原本的数据, 是产生新的对应的数据
- 过滤器的定义
  - 全局过滤器：Vue.filter(name, callback)
  ```js
  Vue.filter('mySlice', function (value, length = 4) {
    return value.slice(0, length)
  })
  ```
  - 局部过滤器：new Vue({filters:{name:callback}})
  ```js
  new Vue({
    el: '#root',
    data: {
      msg: 'hello vue',
      time: new Date()
    },
    filters: {
      mySlice: function (value, length = 4) {
        return value.slice(0, length)
      }
    }
  })
  ```
- 过滤器的使用
  - 表达式得到的结果会作为参数传递给过滤器函数，然后返回处理后的结果
  - 插值表达式：{{ 表达式 | 过滤器名 }}
  ```html
    <h3>{{msg | mySlice}}</h3>
  ```
  - v-bind:属性 = "表达式 | 过滤器名"
  ```html
    <h3 v-bind:title="msg | mySlice">鼠标悬停查看title</h3>
  ```
  - 可传递其他参数
  ```html
    <h3>{{msg | mySlice(5)}}</h3>
  ```
  - 可以串联：{{ 表达式 | 过滤器名1 | 过滤器名2 }}
  ```html
    <h3>{{msg | mySlice | myUpper}}</h3>
  ```

[过滤器](./page/过滤器.html)

![过滤器](./imgs/过滤器.png)

# 内置指令与自定义指令

## v-text
- 作用：更新元素的textContent
- 语法：v-text="表达式"
- 与插值表达式的区别
  - v-text会替换掉元素中的内容，{{}}则不会
```html
  <!-- msg的值会将p标签中的内容替换掉 -->
  <p v-text="msg">这是一个段落</p>
```
[v-text](./page/内置指令与自定义指令/v-text.html)

## v-html
- 作用：向指定节点中渲染包含html结构的内容
- 语法：v-html="表达式"
- 与插值表达式的区别
  - v-html会替换掉元素中的内容，{{}}则不会
  - 可以解析html标签
```html
  <!-- htmlContent的内容会被解析为html标签 -->
  <p v-html="htmlContent">这是一个段落</p>
```
- 注意
  - v-html有安全性问题
  - 不能使用v-html指令拼接html字符串，会导致XSS攻击
  - 一定要在可信的内容上使用v-html，千万不要用在用户提交的内容上

[v-html](./page/内置指令与自定义指令/v-html.html)

![v-html](./imgs/v-html.png)

## v-cloak
- 作用：解决插值表达式闪烁问题
- 语法：v-cloak
- 原理：
  - 先隐藏元素，等数据加载完成后再显示元素
- 注意：
  - 必须和css样式一起使用
```html
  <style>
    [v-cloak] {
      display: none;
    }
  </style>
  <div v-cloak>
    {{msg}}
  </div>
```
[v-cloak](./page/内置指令与自定义指令/v-cloak.html)

## v-once
- 作用：只渲染元素和组件一次，后续数据的改变不会触发元素的更新
- 语法：v-once
- 注意：
  - v-once指令后面不能跟任何表达式
```html
  <p v-once>{{msg}}</p>
```
[v-once](./page/内置指令与自定义指令/v-once.html)

## v-pre

- 作用：跳过元素和组件的编译过程，直接显示元素的原始内容。可以用于跳过一些不需要编译的元素，提高渲染效率。
- 语法：v-pre
```html
  <p v-pre>这是一篇文章</p>
```
[v-pre](./page/内置指令与自定义指令/v-pre.html)

