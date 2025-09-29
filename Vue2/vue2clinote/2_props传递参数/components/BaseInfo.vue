<template>
  <div ref="baseInfo">
    <!-- 在组件的模板中直接使用 props 中的参数 -->
    <h2>基本信息</h2>
    <p>姓名：{{ name }}</p>
    <p>本地姓名：{{ localName }}</p>
    <p>年龄：{{ age }}</p>
    <p>ID：{{ id }}</p>
    <p>{{ isVip ? '会员' : '非会员' }}</p>
  </div>
</template>

<script>
export default {
    props: {
        name: [String],// name为String类型
        age: {
            type: Number,
            default: 0,// 默认值为0
            required: true,// 必填
            // 自定义验证函数
            validator: (value) => {
                return value >= 0;// 年龄必须大于等于0
            }
        },
        id: {
            type: String,
            default: ""
        },
        isVip: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
            // name: "李四",// data中不允许声明props中的同名属性，否则会报Vue警告
            localName: this.name,// 可以在data中声明一个本地属性，来存储props中的值
        }
    },
    created() {
        // 通过this.$props访问所有传递的props
        console.log(this.$props);
        // props是只读的，不能直接修改props中的值，会报Vue警告
        // this.name = "kk";
        // 可以修改本地属性，不影响props中的值
        this.localName = "张三";
    },
    mounted() {
        // 未在组件 props 选项中声明的属性，默认情况下，这些属性会自动添加到组件的根元素上。
        console.log(this.$refs.baseInfo);// <div email="123@qq.com"><h2>基本信息</h2><p>姓名：Kensen</p><p>本地姓名：张三</p><p>年龄：20</p></div>
    }
}
</script>

<style>

</style>