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
    url: '/subjects',
    method: 'POST',
    data
  })
}
// 学科详情
export const getSubjectsDetailAPI = (id) => {
  return request({
    url: `/subjects/${id}`
  })
}
// 学科修改
export const editSubjectsAPI = (data) => {
  return request({
    url: `/subjects/${data.id}`,
    method: 'PUT',
    data
  })
}
// 删除
export const delSubjectsAPI = (id) => {
  return request({
    url: `/subjects/${id}`,
    method: 'DELETE'
  })
}

