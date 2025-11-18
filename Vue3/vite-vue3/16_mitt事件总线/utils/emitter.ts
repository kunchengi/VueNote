// 引入 mitt 库
import mitt from 'mitt'

// 创建 mitt 实例，有all、emit、on、off 方法
const emitter = mitt()

export default emitter
