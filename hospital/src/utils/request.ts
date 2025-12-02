// 对axios进行二次封装
import axios from 'axios'
import { ElMessage } from 'element-plus'

// 创建axios实例
const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,// 基础路径
  timeout: 5000,// 超时时间
})

// 请求拦截器
request.interceptors.request.use((config) => {
  // 在发送请求之前做些什么
  return config;
})

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data;
  },
  (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if (!error.response) {// 没有响应体,可能是请求超时或网络错误
      ElMessage.error(error.message)
    }else{
      const status: number = error.response.status;
      console.log('响应错误', status);
      if(status === 404){
        ElMessage.error('请求资源不存在')
      }else if(status === 401){
        ElMessage.error('未授权，请登录')
      }
      else if(status >= 500){
        ElMessage.error('服务器错误')
      }
    }
    return Promise.reject(error)
  }
)

export default request;
