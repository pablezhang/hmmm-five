import request from '@/utils/request'

export const getArticlesAPI = (params) => {
  return request({ url: ' /articles', params })
}

export const addArticlesAPI = (data) => {
  return request({ url: ' /articles', method: 'post', data })
}

export const delArticlesAPI = (id) => {
  return request({ url: '/articles/' + id, method: 'DELETE' })
}

export const stateArticlesAPI = (data) => {
  return request({ url: '/articles/' + data.id + '/' + data.state, method: 'post', data })
}
