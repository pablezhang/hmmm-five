import request from '@/utils/request'

export const gerQuestionsAPI = (data) => {
  return request({
    url: '/questions',
    data
  })
}

export const deleteQuestionsAPI = (id) => {
  return request({
    method: 'delete',
    url: `/questions/${id}`
  })
}

export const gerQuestionsViewAPI = (id) => {
  return request({
    url: `/questions/${id}`
  })
}

export const getSubjectsAPI = (data) => {
  return request({
    url: ' /subjects/simple',
    data
  })
}
