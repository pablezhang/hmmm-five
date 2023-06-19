import request from '@/utils/request'

export const getQuestionListAPI = (params) => {
  return request({
    url: '/questions/randoms/'
  })
}
