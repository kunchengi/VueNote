# Vue3简介

## 性能提升

- 打包大小减少41%
- 初次渲染提升55%，更新渲染提升133%
- 内存占用减少54%

## 源码升级

- 使用Proxy代替Object.defineProperty实现响应式
- 重写虚拟DOM的实现和Tree-Shaking

## 拥抱TypeScript

- Vue3可以更好的支持TypeScript

## 新的特性

### 组合式API

- setup函数
- ref与reactive
- 计算属性与监听属性
- ......

### 新的内置组件

- Fragment
- Teleport
- Suspense
- ......

### 其他改变

- 生命周期钩子
- data选项始终被声明为函数
- 移除keyCode支持作为v-on的修饰符
- 在模板中可以写多个根元素
- ......

# 选项式API（Options API）和组合式API（Composition API）

- 选项式API
  - 以Vue实例为中心，通过选项配置来定义组件的行为
  - 如：data、computed、watch、methods等选项
  - 缺点
    - 若新增或者修改需求，需要分别修改data、computed、watch、methods等选项，不便于维护和复用
![选项式API代码示例](./imgs/选项式API代码示例.gif)
![选项式API](./imgs/选项式API.gif)
- 组合式API
  - 以函数为中心，将不同的功能写成不同的函数
  - 优点：
    - 若新增或者修改需求，只需要修改对应的函数即可
    - 可以更好的组织代码，将相关的功能放在一起
![组合式API](./imgs/组合式API.gif)
![选项式API转成组合式API](./imgs/选项式API转成组合式API.gif)

# setup函数

## setup简介

- setup是组合式API的入口函数，组件中所用到的数据、方法、计算属性、监听属性等都需要在setup函数中进行定义

## setup函数的基本使用

- 使用setup配置项
  - 在setup函数中定义数据、方法（计算属性和监听属性后面的章节会讲到）
  - 使用return返回数据、方法
  - 如果声明的数据没有用ref包裹，那么数据不是响应式的，即时修改了数据，页面也不会更新
  - setup中的this是undefined
```ts
  export default {
    name: 'Person',
    setup() {
      console.log(this); // undefined，因为setup函数在beforeCreate钩子之前执行，此时组件实例还未创建

      // 定义数据
      let name = '张三';
      let age = 18;
      let tel = '12345678901';

      // 定义方法
      // 如果没用ref包裹，那么数据不是响应式的，即时修改了数据，页面也不会更新。后面会讲到ref和reactive创建响应式数据
      function changeName() {
        name = '李四';
      }
      function changeAge() {
        age++;
      }
      function showTel() {
        alert(tel);
      }

      // 返回数据和方法
      // 如果返回一个对象，在模板中可以直接使用对象的属性
      return {
        name,
        age,
        tel,
        changeName,
        changeAge,
        showTel,
      }
    },
  }
```

- 在模板中使用setup函数返回的数据和方法
```html
  <div>
    <h2>姓名：{{ name }}</h2>
    <h2>年龄：{{ age }}</h2>
    <button @click="changeName">修改姓名</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="showTel">显示电话</button>
  </div>
```

## 特点

- setup函数return的对象中的属性，可以直接在模板中使用
- setup函数可以返回一个函数，页面直接渲染函数的返回值，一般不会这么用
```ts
  export default {
    name: 'Person',
    setup() {
      // 如果返回一个函数，页面直接渲染函数的返回值，一般不会这么用
      return ()=>"hello vue3"
    }
  }
```

- setup函数在beforeCreate钩子之前执行，它比所有生命周期钩子执行都要早
```ts
  export default {
    name: 'Person',
    setup() {
      console.log('先执行setup函数');
    },
    beforeCreate() {
      console.log('再执行beforeCreate钩子');
    },
  }
```

- setup中访问this是undefined（vue3中弱化了this），因为setup函数在beforeCreate钩子之前执行，此时组件实例还未创建
```ts
  export default {
    name: 'Person',
    setup() {
      console.log(this); // undefined，因为setup函数在beforeCreate钩子之前执行，此时组件实例还未创建
    }
  }
```

## setup与data、computed、watch、methods等选项的关系

- setup函数是用来替代data、computed、watch、methods等选项的
- 如果同时写setup和data、computed、watch、methods等选项，相同数据名称谁写在后，就以谁为准
- data、computed、watch、methods选项中使用this能访问setup中返回的对象的属性
- setup中不能访问data、computed、watch、methods等选项中的数据和方法
- vue3不建议同时使用setup和data、computed、watch、methods等选项，因为setup可以更好地组织代码，将相关的功能放在一起
```ts
  export default {
    name: 'Person',
    setup() {
      let name = '张三';
      return {
        name,
      }
    },
    data() {
      return {
        name: '李四',// 如果在data和setup中都定义了相同名称的数据，那么谁写在后，就以谁为准
        userName: this.name,// 在data中可以通过this访问setup中的数据
      }
    }
  }
```

![setup基本使用](./imgs/setup基本使用.png)

## setup语法糖（简写）

- 安装vite-plugin-vue-setup-extend插件
```bash
  npm install vite-plugin-vue-setup-extend -D
```

- 在vite.config.ts中配置插件
```ts
  import { defineConfig } from 'vite'
  import vue from '@vitejs/plugin-vue'
  // 引入vite-plugin-vue-setup-extend插件
  import vueSetupExtend from 'vite-plugin-vue-setup-extend'

  export default defineConfig({
    plugins: [vue(), vueSetupExtend()],// 使用vue和vueSetupExtend插件
  })
```

- 在组件中使用setup语法糖
  - 可以直接在script标签中添加setup属性，代表该标签内写的是setup函数，且会将内部声明的变量、函数等自动返回，不需要return
  - 使用vueSetupExtend插件，可以在script标签中添加name属性，代表组件的名称，在模板中可以直接使用组件名称
```ts
  <script setup lang="ts" name="User">
  let name = '张三';
  let age = 18;
  let tel = '12345678901';
  function changeName() {
      name = '李四';
  }
  function changeAge() {
      age++;
  }
  function showTel() {
      alert(tel);
  }
  </script>
```

- 在模板中使用组件名称
```html
  <div>
    <h1>User组件</h1>
    <h2>name：{{ name }}</h2>
    <h2>age：{{ age }}</h2>
    <button @click="changeName">修改姓名</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="showTel">显示电话</button>
  </div>
```

- 在data配置项中不能通过this访问setup简写中的数据
```ts
  export default {
    name: 'User',
    data() {
      return {
        userName: this.name,// 在data中不能通过this访问setup简写中的数据,userName为undefined
      }
    },
  }
```

![setup语法糖](./imgs/setup语法糖.png)

# ref函数

- ref函数用于创建响应式数据

## ref函数的使用

- 引入ref函数，用于创建响应式数据
```ts
  import { ref } from 'vue'
```

- 使用ref创建响应式数据
- ref函数返回的是一个RefImpl对象（ref对象）
  - ref对象中包含value等属性，值为ref函数的参数
  - ref对象不是响应式的，value属性是响应式的
  - 如果传入的参数为引用类型，ref函数会通过reactive函数将引用类型数据转换为响应式对象，则value属性值为Proxy对象(reactive函数会基于Proxy实现响应式，后面再讲)
```ts
  // 使用ref创建基本类型的响应式数据
  let name = ref('张三');
  // 使用ref创建对象类型的响应式数据
  const car = ref({
    brand: '奔驰',
    price: 1000000,
  })
  console.log(car.value);// Proxy(Object)
  // 使用ref创建数组类型的响应式数据
  const phones = ref([
    {
      id: 1,
      brand: '小米',
      price: 3000,
    },
    {
      id: 2,
      brand: '华为',
      price: 4000,
    },
  ])
  console.log(phones.value);// Proxy(Array) 
```

- 在js中可以查看和修改.value，修改后页面会自动更新
```ts
  function changeName() {
    // 直接修改name.value，页面会自动更新
    name.value = '李四';
    console.log(name.value);// 李四
  }
  function changeCarPrice() {
    // 直接修改car.value.price，页面会自动更新
    car.value.price = 800000;
  }
  function deletePhone(id: number) {
    phones.value = phones.value.filter((phone) => phone.id !== id);
  }
```

- 可以在模板中直接使用ref数据，不需要.value
```html
  <!-- 模板中直接使用name，不需要name.value -->
  <h2>姓名：{{ name }}</h2>
  <button @click="changeName">修改姓名</button>
  <h2>车信息：</h2>
  <!-- 模板中直接使用car.brand -->
  <p>车品牌：{{ car.brand }}</p>
  <!-- 模板中直接使用car.price -->
  <span>车价：{{ car.price }}</span>
  <button @click="changeCarPrice">修改车价</button>
  <h2>手机信息：</h2>
  <div v-for="phone in phones" :key="phone.id">
    <span>{{ phone.brand }}：{{ phone.price }}</span>
    <button @click="deletePhone(phone.id)">删除</button>
  </div>
```

![ref函数](./imgs/ref函数.png)

## 使用Vue扩展插件自动补全.value

- vs code安装volar扩展插件
  - Vue (Official)

- 设置 -> 扩展 -> Vue -> Auto Insert Dot Value -> 开启

- 当使用ref数据时，编辑器会自动补全.value