import API from '../../api.js'

const state = {
  token: localStorage.getItem('token') || '',
  user: null
}

const getters = {
  token: state => state.token,
  user: state => state.user,
  isAuth: state => !!state.token
}

const mutations = {
  SET_USER (state, payload) {
    localStorage.setItem('token', payload.access_token)
    state.token = payload.access_token
    state.user = payload
  },
  USER_LOGOUT () {
    localStorage.removeItem('token')
    window.location.reload()
  }
}

const actions = {
  registrateUser ({ commit, dispatch }, data) {
    return new Promise((resolve, reject) => {
      API.post('api/companies', { inn: data.inn, email: data.email, password: data.password, repPassword: data.repPassword }, {})
        .then(response => {
          this.$router.push({ name: 'settings' })
          commit('SET_USER', response.data.data)
          location.reload()
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  loginUser ({ commit }, data) {
    return new Promise((resolve, reject) => {
      API.post('api/companies/login', { email: data.email, password: data.password }, {})
        .then(response => {
          commit('SET_USER', response.data.data)
          location.reload()
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  logoutUser ({ commit }) {
    return new Promise((resolve, reject) => {
      API.get('api/companies/logout', { headers: { 'Authorization': 'Bearer ' + state.token } })
        .then(response => {
          commit('USER_LOGOUT')
          resolve(response)
        })
        .catch(error => {
          commit('USER_LOGOUT')
          reject(error)
        })
    })
  },
  restorePassword ({ commit }, email) {
    return new Promise((resolve, reject) => {
      API.get('companies/restore', { headers: { 'Authorization': 'Bearer ' + state.token }, params: { email: email } })
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
