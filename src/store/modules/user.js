import { postUserLoginAPI } from '@/api/user'
import router from '@/router'
import { getToken, setToken } from '@/utils/auth'
import { Message } from 'element-ui'

const state = {
  token: getToken()
}

const mutations = {
  saveToken(state, payload) {
    state.token = payload
  }
}

const actions = {
  async loginActions({ commit }, payload) {
    const res = await postUserLoginAPI(payload)
    commit('saveToken', res)
    setToken(res)
    Message.success('登录成功')
    router.push('/')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

