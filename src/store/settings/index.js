import API from '../../api.js'

const state = {
  companyInfo: null,
  token: localStorage.getItem('token') || ''
}

const getters = {
  companyInfo: state => state.companyInfo
}

const mutations = {
  SET_COMPANY_INFO (state, payload) {
    state.companyInfo = payload
  }
}

const actions = {
  loadCompanyInfo ({ commit, dispatch, getters }) {
    return new Promise((resolve, reject) => {
      API.get('api/companies', { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } })
        .then(response => {
          localStorage.setItem('inn', response.data.data.inn)
          commit('SET_COMPANY_INFO', response.data.data)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  editCompanyInfo ({ commit }, data) {
    return new Promise((resolve, reject) => {
      API.put('api/companies', data, { headers: { 'Authorization': 'Bearer ' + state.token } })
        .then(response => {
          commit('SET_COMPANY_INFO', response.data.data)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  sendDocs ({ dispatch }, data) {
    return new Promise((resolve, reject) => {
      API.post('api/companies/agreement/upload', data, { headers: { 'Authorization': 'Bearer ' + state.token } })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

export default {
  namespaced: true,
  getters,
  mutations,
  actions,
  state
}
