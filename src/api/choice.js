import request from '@/utils/request'

export const getQuestionsChoiceAPI = (params) => { return request({ url: '/questions/choice', method: 'get', params }) }

// 获取学科简单列表
export const getSubjectsSimpleAPI = (params) => { return request({ url: '/subjects/simple', method: 'get', params }) }

// 获取目录列表
export const getDirectorysAPI = (params) => { return request({ url: '/directorys', method: 'get', params }) }

// 获取标签列表
export const getTagsAPI = (params) => { return request({ url: '/tags', method: 'get', params }) }

// 获取用户简单列表
export const getUsersSimpleAPI = (params) => { return request({ url: '/users/simple', method: 'get', params }) }

// 获取题库详情
export const getQuestionsIdAPI = (id) => { return request({ url: `/questions/${id}`, method: 'get' }) }

// 试题审核
export const getQuestionsCheckAPI = (data) => { return request({ url: ` /questions/check/${data.id}`, method: 'POST', data }) }

// 精选题库上下架
export const getChoicePublishStateAPI = (data) => { return request({ url: ` /questions/choice/${data.id}/${data.publishState}`, method: 'POST' }) }

// 题库删除
export const getQuestionsDeleteAPI = (data) => { return request({ url: `/questions/${data.id}`, method: 'DELETE' }) }
