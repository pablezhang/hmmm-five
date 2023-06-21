import axios from 'axios'
import { getToken, removeToken } from './auth'
import { Message } from 'element-ui'
import router from '@/router'
import store from '@/store'

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000
})

export const requestTwo = axios.create({
  baseURL: 'http://hmajax.itheima.net/',
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
    removeToken()
    router.push('/login')
    store.commit('user/saveToken', null)
    return Promise.reject(new Error(error))
  }
})

// 添加请求拦截器
requestTwo.interceptors.request.use(function(config) {
  return config
}, function(error) {
  return Promise.reject(error)
})

// 添加响应拦截器
requestTwo.interceptors.response.use(function(response) {
  return response
}, function(error) {
  return Promise.reject(new Error(error))
})

export default request

