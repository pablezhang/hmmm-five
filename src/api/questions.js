import request from '@/utils/request'

export const gerQuestionsAPI = (data) => {
  return request({
    url: '/questions',
    data
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

export const getSubjectsAPI = (data) => {
  return request({
    url: ' /subjects/simple',
    data
  })
}

export const getCreatorAPI = (data) => {
  return request({
    url: ' /users/simple',
    data
  })
}

