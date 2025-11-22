import { customRef } from 'vue'
/**
 * @description 函数防抖
 * @param {Function} fn 需要防抖的函数
 * @param {Number} wait 延迟时间
 * @return void
 * @status public
 */
function debounce<T extends (...args: any[]) => any>(fn: T, delay: number = 500) {
  let timer: number | null = null
  return function(this: any, ...args: Parameters<T>) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, delay)
  }
}
/**
 * @description 自定义ref实现输入框防抖
 * @param {String} value 输入框的值
 * @return {Ref} 防抖后的ref对象
 * @status public
 */
export default function(value: string, delay: number = 500) {
  const debounceRef = customRef((track, trigger) => {
    // 获取防抖函数
    const debounceFn = debounce((newValue: string) => {
        value = newValue
        trigger()
    }, delay)
    return {
      get() {
        track()
        return value
      },
      set(newValue) {
        debounceFn(newValue)
      }
    }
  })
  return debounceRef
}