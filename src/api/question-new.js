import request from '@/utils/request'

export const getSimpleSubjectListAPI = () => {
  return request({ url: '/subjects/simple' })
}

export const getCompanyListAPI = () => {
  return request({ url: '/companys' })
}

export const addOptionAPI = (data) => {
  return request({ url: '/questions', method: 'post', data })
}

export const detailQuestionsAPI = (params) => {
  return request({
    url: `/questions/${params.id}`, params
  })
}

export const editQuestionAPI = (data) => {
  return request({ url: `/questions/${data.id}`, method: 'put', data })
}
