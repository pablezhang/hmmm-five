import request from '@/utils/request'

export const getQuestionListAPI = () => {
  return request({
    url: '/questions/randoms'
  })
}
