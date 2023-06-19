import request from '@/utils/request'

export const getSimpleSubjectListAPI = () => {
  return request({ url: '/subjects/simple' })
}

export const getCompanyListAPI = (params) => {
  return request({ url: '/companys' })
}
