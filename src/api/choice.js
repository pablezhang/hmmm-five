import request from '@/utils/request'

export const getQuestionsChoiceAPI = (params) => { return request({ url: '/questions/choice', method: 'get', params }) }
