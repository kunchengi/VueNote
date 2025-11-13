// 用户模块相关的数据
// 引入defineStore函数
import { defineStore } from 'pinia'
import { ref, computed } from 'vue';
export const useUserStore = defineStore('user', () => {
  // 定义状态
  const firstname = ref('张');
  const lastname = ref('三');
  // 定义方法
  const setName = ({ firstName, lastName }: { firstName: string; lastName: string }) => {
    firstname.value = firstName;
    lastname.value = lastName;
  }
  // 定义计算属性
  const fullName = computed(() => firstname.value + lastname.value);
  // 返回状态、方法、计算属性
  return { firstname, lastname, setName, fullName };
})