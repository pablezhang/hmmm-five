import request from '@/utils/request'

// 目录列表
export const getCatalogListAPI = (params) => {
  return request({
    url: '/directorys',
    params
  })
}

// 学科简单列表
export const getSubjectListAPI = () => {
  return request({
    url: '/subjects/simple'
  })
}

// 新增目录
export const addCatalogAPI = (data) => {
  return request({
    url: '/directorys',
    method: 'post',
    data
  })
}

// 单条目录详情
export const getCatalogDetailAPI = (id) => {
  return request({
    url: `/directorys/${id}`
  })
}

// 修改目录详情
export const updateCatalogDetailAPI = (data) => {
  return request({
    url: `/directorys/${data.id}`,
    method: 'put',
    data
  })
}
