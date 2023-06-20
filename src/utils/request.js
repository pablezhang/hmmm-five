import axios from 'axios'
import { getToken } from './auth'

const request = axios.create({
  timeout: 5000
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
  return response.data
}, function(error) {
  return Promise.reject(error)
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
