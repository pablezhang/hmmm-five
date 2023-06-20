import request from '@/utils/request'

export const getTagsListAPI = (params) => {
  return request({ url: '/tags', params })
}

export const delTagsAPI = (id) => {
  return request({ url: `/tags/${id}`, method: 'delete' })
}

export const addTagsListAPI = (data) => {
  return request({ url: '/tags', method: 'post', data })
}

export const detailTagsListAPI = (id) => {
  return request({ url: `/tags/${id}` })
}
