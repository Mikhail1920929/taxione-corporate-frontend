import API from '../../api.js'

const state = {
  groups: [ ],
  group: null,
  token: localStorage.getItem('token') || ''
}

const getters = {
  groups: state => state.groups,
  group: state => state.group
}

const mutations = {
  SET_GROUPS (state, payload) {
    state.groups = payload.data
  },
  SET_GROUP (state, payload) {
    state.group = payload.data
  }
}

const actions = {
  loadGroups ({ commit }) {
    return new Promise((resolve, reject) => {
      API.get('api/companies/groups', { headers: { 'Authorization': 'Bearer ' + state.token } })
        .then(response => {
          commit('SET_GROUPS', response.data)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // loadGroup ({ commit }) {
  //   return new Promise((resolve, reject) => {
  //     API.get('api/companies/groups/4', { headers: { 'Authorization': 'Bearer ' + state.token } })
  //       .then(response => {
  //         commit('SET_GROUP', response.data)
  //         resolve(response)
  //       })
  //       .catch(error => {
  //         reject(error)
  //       })
  //   })
  // },
  addGroup ({ dispatch }, name) {
    return new Promise((resolve, reject) => {
      API.post('api/companies/groups', {
        name: name
      }, { headers: { 'Authorization': 'Bearer ' + state.token } })
        .then(response => {
          dispatch('loadGroups')
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
