import axios from 'axios'
import { getToken, removeToken } from './auth'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'

const request = axios.create({
  timeout: 5000
})

// 添加请求拦截器
request.interceptors.request.use(function(config) {
  const token = getToken()
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, function(error) {
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function(response) {
  if (response.status === 200) {
    return response.data
  }
}, function(error) {
  if (error.response.status !== 401) {
    Message.error(error.response.data.message)
    return Promise.reject(new Error(error))
  } else {
    removeToken()
    store.commit('saveToken', '')
    router.push('/login')
    Message.error('登录超时,请重新登录')
    return Promise.reject(new Error(error))
  }
})

export default request
