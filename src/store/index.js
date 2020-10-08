import Vue from 'vue'
import Vuex from 'vuex'

import login from './login'
import rides from './rides'
import users from './users'
import groups from './groups'
import settings from './settings'
import archive from './archive'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      login,
      rides,
      users,
      groups,
      settings,
      archive
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
