import request, { requestTwo } from '@/utils/request'

export const gerQuestionsAPI = (params) => {
  return request({
    url: '/questions',
    params
  })
}

export const deleteQuestionsAPI = (id) => {
  return request({
    method: 'delete',
    url: `/questions/${id}`
  })
}

export const gerQuestionsViewAPI = (id) => {
  return request({
    url: `/questions/${id}`
  })
}

export const addChoiceAPI = ({ id, choiceState }) => {
  return request({
    method: 'patch',
    url: `/questions/choice/${id}/${choiceState}`

  })
}

export const getSubjectsAPI = (params) => {
  return request({
    url: '/subjects/simple',
    params
  })
}

export const getCreatorAPI = (params) => {
  return request({
    url: '/users/simple',
    params
  })
}

export const getProvinceAPI = () => {
  return requestTwo({
    url: '/api/province'
  })
}

export const getCityAPI = (params) => {
  return requestTwo({
    url: '/api/city',
    params
  })
}

