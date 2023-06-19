import request from '@/utils/request'

export const getArticlesAPI = (params) => {
  return request({ url: ' /articles', params })
}
