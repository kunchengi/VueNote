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