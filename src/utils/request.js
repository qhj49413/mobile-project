// 对axios进行二次封装
//    axios本身是一个独立的库，是对ajax的封装。为了方便在项目中使用，我们对它再次封装
// (1) 接口基地址
// (2) 请求，响应拦截器
import axios from 'axios'
import store from '@/store'
import router from '@/router/auth'
const JSONbig = require('json-bigint')

const instance = axios.create({
  // 后端服务器1
  baseURL: 'http://ttapi.research.itcast.cn',
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理
    try {
      return JSONbig.parse(data)
    } catch (e) {
      return data
    }
  }]
  // baseURL: 'http://api-toutiao-web.itheima.net'
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

// 添加请求拦截器 -- 所有的请求在发出去之前，都会到这里来
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const token = store.state.tokenInfo.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 添加响应拦截器
instance.interceptors.response.use(function (config) {
  return config
}, async function (error) {
  // 对请求错误做些什么
  const refreshToken = store.state.tokenInfo.refresh_token
  if (error.response && error.response.status === 401) {
    if (refreshToken) {
      try {
        const result = await axios({
          method: 'PUT',
          url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
          headers: {
            Authorization: 'Bearer ' + refreshToken
          }
        })
        const newToken = result.data.data.token
        store.commit('setToken', {
          token: newToken,
          refresh_token: refreshToken
        })
        // console.dir(error)
        // 重发关注或者其他需要token存在时才能发出的请求
        return instance(error.config)
      } catch (err) {
        // 发送请求失败跳转到主页从新登陆
        router.push(`/login?backto=${router.currentRoute.fullPath}`)
      }
    } else {
      // refreshToken不存在也跳转到主页从新登陆
      router.push(`/login?backto=${router.currentRoute.fullPath}`)
    }
  }
  return Promise.reject(error)
})

const instanceSpare = axios.create({
  // 后端备用服务器2
  baseURL: 'http://api-toutiao-web.itheima.net'
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

// const instance3 = axios.create({
//   // 后端服务器3
//   baseURL: 'http://api-toutiao-web.itheima.com'
//   // timeout: 1000,
//   // headers: {'X-Custom-Header': 'foobar'}
// })

export { instance, instanceSpare }

// 默认导出intance1
export default instance
