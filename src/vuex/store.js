import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types.js'
import * as actions from './actions.js'
import * as getters from './getters.js'
// Make vue aware of Vuex
Vue.use(Vuex)

// Combine the initial state and the mutations to create a Vuex store.
// This store can be linked to our app.
const state = {
  tokenHeader: {},
  categoryCrud: {},
  inventoryCrud: {},
  order: []
}

const mutations = {
  [types.SET_AUTH_TOKEN] (state, token) {
    state.tokenHeader = token
  },
  [types.SET_CATEGORY_CRUD] (state, crud) {
    state.categoryCrud = crud
  },
  [types.SET_INVENTORY_CRUD] (state, crud) {
    state.inventoryCrud = crud
  },
  [types.SET_ORDER] (state, event) {
    state.order.push(event)
  },
  [types.REMOVE_ITEM_ORDER] (state, event) {
    const index = this.order.indexOf(event)
    state.order.splice(index, 1)
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
