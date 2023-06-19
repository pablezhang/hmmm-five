import request from '@/utils/request'

export const postUserLoginAPI = (data) => {
  return request({
    url: '/frame/login',
    method: 'post',
    data
  })
}
