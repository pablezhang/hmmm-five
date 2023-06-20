import request from '@/utils/request'

export const getTagsListAPI = (params) => {
  return request({ url: '/tags', params })
}

export const delTagsAPI = (id) => {
  return request({ url: `/tags/${id}`, method: 'delete' })
}
