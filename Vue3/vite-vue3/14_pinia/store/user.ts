// 用户模块相关的数据
// 引入defineStore函数
import { defineStore } from 'pinia'
import { ref, computed } from 'vue';

// Cookie 存储对象（显式类型声明，匹配 StorageLike 接口）
const cookieStorage: { 
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
} = {
  getItem: (key: string): string | null => {
    // 从 Cookie 中获取指定 key 的值
    const value = document.cookie.match(new RegExp('(^| )' + key + '=([^;]+)'))
    return value && value[2] ? value[2] : null
  },
  setItem: (key: string, value: string): void => {
    // 设置 Cookie，过期时间为 7 天
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${key}=${value};expires=${expires};path=/`
  },
  removeItem: (key: string): void => {
    // 删除 Cookie，设置过期时间为过去时间，使 Cookie 失效
    document.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
  }
}

export const useUserStore = defineStore('user', () => {
  // 定义状态
  const firstname = ref<string>('张');
  const lastname = ref<string>('三');
  // const birth = ref<Date>(new Date('2000-01-01'));
  // 定义方法
  const setName = ({ firstName, lastName }: { firstName: string; lastName: string }) => {
    firstname.value = firstName;
    lastname.value = lastName;
    // birth.value = new Date('2001-01-01');
  }
  // 定义计算属性
  const fullName = computed(() => firstname.value + lastname.value);
  // const birthStr = computed(() => birth.value.toLocaleDateString());
  // 返回状态、方法、计算属性
  return { firstname, lastname, setName, fullName };
  // return { firstname, lastname, birth, setName, fullName, birthStr };
},
  // 基础使用
  {
    persist: true // 开启持久化，会自动将状态存储在 Storage 中，默认使用 localStorage，key为store.id
  }

  // 自定义存储 Key 和存储位置
  // {
  //   persist: {
  //     key: 'userStore', // 自定义存储 Key
  //     storage: window.sessionStorage // 存储位置：sessionStorage（关闭标签页失效）
  //   }
  // }

  // 仅持久化指定字段
  // {
  //   persist: {
  //     key: 'userStore', // 自定义存储 Key
  //     pick: ['firstname'], // 仅持久化 firstname 字段
  //   }
  // }

  // 处理特殊类型（序列化 / 反序列化）
  // {
  //   persist: {
  //     key: 'userStore', // 自定义存储 Key
  //     serializer: {
  //       // 自定义序列化：处理 Date 对象
  //       serialize: (state) => {
  //         return JSON.stringify({
  //           ...state,
  //           // Date类型转为时间戳（避免JSON序列化丢失）
  //           birth: state.birth.getTime()
  //         })
  //       },
  //       // 自定义反序列化：恢复 Date 对象
  //       deserialize: (data) => {
  //         const parsed = JSON.parse(data)
  //         return {
  //           ...parsed,
  //           // 时间戳转回Date
  //           birth: new Date(parsed.birth)
  //         }
  //       }
  //     }
  //   }
  // }

  // 多策略持久化（不同字段存不同位置）
  // {
  //   persist: [
  //     {
  //       key: 'user-firstname',
  //       storage: localStorage,
  //       pick: ['firstname'] // firstname存localStorage
  //     },
  //     {
  //       key: 'user-lastname',
  //       storage: sessionStorage,
  //       pick: ['lastname'] // lastname存sessionStorage
  //     }
  //   ]
  // }

  // Cookie 存储
  // {
  //   persist: {
  //     key: 'userStore', // 自定义存储 Key
  //     storage: cookieStorage, // 自定义 Cookie 存储对象
  //     pick: ['firstname', 'lastname'] // 仅持久化 firstname 和 lastname 字段
  //   }
  // }
)