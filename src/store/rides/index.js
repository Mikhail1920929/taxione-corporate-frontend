import API from '../../api.js'

const state = {
  rides: [ ],
  meta: null,
  subInfo: null,
  token: localStorage.getItem('token') || ''
}

const getters = {
  rides: state => state.rides,
  meta: state => state.meta,
  subInfo: state => state.subInfo
}

const mutations = {
  SET_RIDES (state, payload) {
    state.rides = payload.data
  },
  SET_NEXT_RIDES (state, payload) {
    state.rides = state.rides.concat(payload.data)
  },
  SET_RIDES_META (state, payload) {
    state.meta = payload.meta
  },
  SET_SUB_INFO (state, payload) {
    state.subInfo = payload
  }
}

const actions = {
  loadRides ({ commit }, data) {
    return new Promise((resolve, reject) => {
      API.get('api/companies/rides', { headers: { 'Authorization': 'Bearer ' + state.token }, params: data })
        .then(response => {
          commit('SET_RIDES', response.data)
          commit('SET_RIDES_META', response.data)
          commit('SET_SUB_INFO', {
            start: response.data.start,
            end: response.data.end,
            rides_count: response.data.rides_count,
            rides_sum: response.data.rides_sum
          })
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  loadRidesNextPage ({ commit }, data) {
    return new Promise((resolve, reject) => {
      API.get('api/companies/rides?page=' + data.page, { headers: { 'Authorization': 'Bearer ' + state.token }, params: data.params })
        .then(response => {
          commit('SET_NEXT_RIDES', response.data)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  loadRideStatus ({ commit }, data) {
    return new Promise((resolve, reject) => {
      API.get('api/companies/rides/status', { headers: { 'Authorization': 'Bearer ' + state.token }, params: data })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  sendCoords ({ commit }, data) {
    return new Promise((resolve, reject) => {
      API.post('api/companies/rides/estimate',
        {
          client_id: data.client_id,
          position: {
            'city': data.from.city || 'Not found',
            'country': data.from.country || 'Not found',
            'latitude': data.from.lat,
            'longitude': data.from.lng,
            'name': data.from.name || 'Not found',
            'text': data.from.text,
            'postal_code': data.from.postal_code || 'Not found',
            'street_name': data.from.street_name || 'Not found',
            'street_number': data.from.street_number || 'Not found'
          },
          destination: {
            'city': data.to.city || 'Not found',
            'country': data.to.country || 'Not found',
            'latitude': data.to.lat,
            'longitude': data.to.lng,
            'name': data.to.name || 'Not found',
            'text': data.to.text,
            'postal_code': data.to.postal_code || 'Not found',
            'street_name': data.to.street_name || 'Not found',
            'street_number': data.to.street_number || 'Not found'
          },
          billing: data.billing
        }, { headers: { 'X-CurrentCountry': 'RUS',
          'Authorization': 'Bearer ' + state.token } })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  createRide ({ commit }, data) {
    return new Promise((resolve, reject) => {
      API.post('api/companies/rides',
        {
          client_id: data.client_id + '',
          uuid: data.uuid,
          class: data.class,
          position: {
            'city': data.from.city || 'Not found',
            'country': data.from.country || 'Not found',
            'latitude': data.from.lat,
            'longitude': data.from.lng,
            'name': data.from.name || 'Not found',
            'text': data.from.text,
            'postal_code': data.from.postal_code || 'Not found',
            'street_name': data.from.street_name || 'Not found',
            'street_number': data.from.street_number || 'Not found'
          },
          destination: {
            'city': data.to.city || 'Not found',
            'country': data.to.country || 'Not found',
            'latitude': data.to.lat,
            'longitude': data.to.lng,
            'name': data.to.name || 'Not found',
            'text': data.to.text,
            'postal_code': data.to.postal_code || 'Not found',
            'street_name': data.to.street_name || 'Not found',
            'street_number': data.to.street_number || 'Not found'
          },
          billing: data.billing,
          template_id: data.template_id,
          start_at: data.start_at
        }, { headers: { 'X-CurrentCountry': 'RUS',
          'Authorization': 'Bearer ' + state.token } })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  cancelRide ({ commit }, data) {
    return new Promise((resolve, reject) => {
      API.delete('api/companies/rides/cancel', { headers: { 'Authorization': 'Bearer ' + state.token }, params: data })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  cancelTemplate ({ commit }, id) {
    return new Promise((resolve, reject) => {
      API.delete('api/companies/rides/' + id, { headers: { 'Authorization': 'Bearer ' + state.token } })
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
