// 计算模块相关的数据
// 引入defineStore函数
import { defineStore } from 'pinia'
import { ref, computed } from 'vue';
export const useCalculateStore = defineStore('calculate', () => {
  // 定义状态
  const sum = ref(0);
  // 定义方法
  const incrementIfOdd = (n: number) => {
    if (sum.value % 2 !== 0) {
      sum.value += n;
    }
  }
  // 异步加
  const incrementAsync = async (n: number) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    sum.value += n;
  }
  // 定义计算属性
  const square = computed(() => sum.value ** 2);
  // 返回状态、方法、计算属性
  return { sum, incrementIfOdd, incrementAsync, square };
})