import request from '@/utils/request'

export const getSimpleSubjectListAPI = () => {
  return request({ url: '/subjects/simple' })
}

export const getCompanyListAPI = (params) => {
  return request({ url: '/companys' })
}

export const addOptionAPI = (data) => {
  return request({ url: '/questions', method: 'post', data })
}
