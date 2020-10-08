import API from '../../api.js'

const state = {
  user: null,
  userRides: null,
  userRidesMeta: null,
  users: [],
  meta: null,
  userRidesInfo: null,
  token: localStorage.getItem('token') || ''
}

const getters = {
  users: state => state.users,
  meta: state => state.meta,
  user: state => state.user,
  userRides: state => state.userRides,
  userRidesMeta: state => state.userRidesMeta,
  userRidesInfo: state => state.userRidesInfo
}

const mutations = {
  SET_USERS (state, payload) {
    state.users = payload.data
  },
  SET_NEXT_USERS (state, payload) {
    state.users = state.users.concat(payload.data)
  },
  SET_USERS_META (state, payload) {
    state.meta = payload.meta
  },
  SET_USER (state, payload) {
    state.user = payload.data
  },
  SET_USER_RIDES (state, payload) {
    state.userRides = payload.data
  },
  SET_USER_RIDES_META (state, payload) {
    state.userRidesMeta = payload.meta
  },
  SET_USER_RIDES_INFO (state, payload) {
    state.userRidesInfo = payload
  },
  SET_NEXT_USER_RIDES (state, payload) {
    state.userRides = state.userRides.concat(payload.data)
  }
}

const actions = {
  loadUsers ({ commit }, data) {
    return new Promise((resolve, reject) => {
      API.get('api/companies/clients', { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }, params: data })
        .then(response => {
          commit('SET_USERS', response.data)
          commit('SET_USERS_META', response.data)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  loadUsersNextPage ({ commit }, data) {
    return new Promise((resolve, reject) => {
      API.get('api/companies/clients?page=' + data.page, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }, params: data.params })
        .then(response => {
          commit('SET_NEXT_USERS', response.data)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  loadUser ({ commit }, id) {
    return new Promise((resolve, reject) => {
      API.get('api/companies/clients/' + id, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } })
        .then(response => {
          commit('SET_USER', response.data)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  loadUserRides ({ commit }, data) {
    return new Promise((resolve, reject) => {
      API.get('api/companies/clients/' + data.id + '/rides', { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }, params: data.dates })
        .then(response => {
          commit('SET_USER_RIDES', response.data)
          commit('SET_USER_RIDES_META', response.data)
          commit('SET_USER_RIDES_INFO', { rides_count: response.data.rides_count, rides_sum: response.data.rides_sum })
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  loadUserRidesNextPage ({ commit }, data) {
    return new Promise((resolve, reject) => {
      API.get('api/companies/clients/' + data.id + '/rides?page=' + data.page, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }, params: data.dates })
        .then(response => {
          commit('SET_NEXT_USER_RIDES', response.data)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  addUser ({ dispatch }, data) {
    return new Promise((resolve, reject) => {
      API.post('api/companies/clients', {
        name: data.name,
        email: data.email,
        country_code: 'RUS',
        phone: data.phone,
        lang: 'ru',
        limit: +data.limit,
        is_active: true,
        is_unlimited: data.is_unlimited,
        group_id: data.group_id
      }, { headers: { 'Authorization': 'Bearer ' + state.token } })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  editUser ({ dispatch }, data) {
    return new Promise((resolve, reject) => {
      API.put('api/companies/clients/' + data.id, data, { headers: { 'Authorization': 'Bearer ' + state.token } })
        .then(response => {
          dispatch('loadUsers')
          dispatch('loadUser', data.id)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  checkUser ({ dispatch }, id) {
    return new Promise((resolve, reject) => {
      API.get('api/companies/clients/' + id + '/check', { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  deleteUser ({ dispatch }, id) {
    return new Promise((resolve, reject) => {
      API.delete('api/companies/clients/' + id, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } })
        .then(response => {
          dispatch('loadUsers')
          if (this.$router.currentRoute.path !== '/users/') this.$router.push({ name: 'users' })
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
