
import request from '@/utils/request'

export const getRandomAPI = (params) => {
  return request({ url: '/api/users', method: 'get', params })
}
