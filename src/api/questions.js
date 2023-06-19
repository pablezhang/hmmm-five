import request from '@/utils/request'

export const gerQuestionsAPI = (data) => {
  return request({
    url: '/questions',
    data
  })
}
