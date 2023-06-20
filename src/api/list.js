import request from '@/utils/request'

export const getSubjectListAPI = (params) => {
  return request({
    url: '/subjects',
    params
  })
}
// 学科添加
export const addSubjectsAPI = (data) => {
  return request({
    url: ' /subjects',
    method: 'POST',
    data
  })
}

