import request from '@/utils/request'

const state_mock = true

const prefix = state_mock ? '/mock' : '/api'

export const getMockDataAPI = () => {
  return request({
    url: `${prefix}/users`,
    method: 'get'
  })
}

export const deleteMockDataAPI = (id) => {
  return request({
    url: `${prefix}/users/delete`,
    method: 'delete'
  })
}
