import request from '@/utils/request'

export const getTagsListAPI = (params) => {
  return request({ url: '/tags', params })
}
