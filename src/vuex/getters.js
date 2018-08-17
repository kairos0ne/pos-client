
// This getter is a function which just returns the count
// With ES6 you can also write it as:
// export const getCount = state => state.count

export const getAuthToken = state => state.tokenHeader

export const getCategoryCrud = state => state.categoryCrud

export const getInventoryCrud = state => state.inventoryCrud

export const getOrder = state => state.order
