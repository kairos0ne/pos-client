// An action will receive the store as the first argument.
// Since we are only interested in the commit (and optionally the state)
// we can pull those two parameters using the ES6 destructuring feature
export const setAuthToken = ({ commit }, token) => {
  commit('SET_AUTH_TOKEN', token)
}
export const setCategoryCrud = ({ commit }, crud) => {
  commit('SET_CATEGORY_CRUD', crud)
}
export const setInventoryCrud = ({ commit }, crud) => {
  commit('SET_INVENTORY_CRUD', crud)
}
export const setOrder = ({ commit }, crud) => {
  commit('SET_ORDER', crud)
}
export const removeOrder = ({ commit }, event) => {
  commit('REMOVE_ITEM_ORDER', event)
}
