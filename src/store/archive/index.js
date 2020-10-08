import API from '../../api.js'

const state = {
  periods: [],
  meta: null,
  subInfo: null,
  token: localStorage.getItem('token') || ''
}

const getters = {
  periods: state => state.periods,
  meta: state => state.meta,
  subInfo: state => state.subInfo
}

const mutations = {
  SET_COMPANY_PERIODS (state, payload) {
    state.periods = payload
  },
  SET_NEXT_PERIODS (state, payload) {
    state.periods = state.periods.concat(payload)
  },
  SET_PERIODS_META (state, payload) {
    state.meta = payload.meta
  },
  SET_SUB_INFO (state, payload) {
    state.subInfo = payload
  }
}

const actions = {
  loadCompanyPeriods ({ commit }, dates) {
    return new Promise((resolve, reject) => {
      API.get('api/companies/periods', { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }, params: dates })
        .then(response => {
          commit('SET_COMPANY_PERIODS', response.data.data)
          commit('SET_PERIODS_META', response.data)
          commit('SET_SUB_INFO', {
            start: response.data.start,
            end: response.data.end
          })
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  loadPeriodsNextPage ({ commit }, data) {
    return new Promise((resolve, reject) => {
      API.get('api/companies/periods?page=' + data.page, { headers: { 'Authorization': 'Bearer ' + state.token }, params: data.dates })
        .then(response => {
          commit('SET_NEXT_PERIODS', response.data)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  sendAct ({ dispatch }, data) {
    return new Promise((resolve, reject) => {
      API.post('api/companies/periods/' + data.periodId + '/upload', data.act, { headers: { 'Authorization': 'Bearer ' + state.token } })
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
