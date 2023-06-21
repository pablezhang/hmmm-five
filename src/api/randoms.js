
import request from '@/utils/request'

export const getRandomAPI = (params) => {
  return request({ url: '/api/users', method: 'get', params })
}
export const delRandomAPI = (data) => {
  return request({ url: '/api/users', method: 'delete', data })
}
export const searchRandomAPI = (params) => {
  return request({
    url: '/api/users/yy',
    params
  })
}
