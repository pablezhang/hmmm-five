import request from '@/utils/request'

export const getSubjectListAPI = (params) => {
  return request({
    url: '/subjects'
  })
}
