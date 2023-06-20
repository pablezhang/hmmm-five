import request from '@/utils/request'

export const getMockDataAPI = () => {
  return request({
    url: '/api/users',
    method: 'get'
  })
}
