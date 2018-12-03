// code-template for async methods
async method ({commit}, payload) {
  commit('clearError')
  commit('setLoading', true)
  try {
    // done
    commit('setLoading', true)
  } catch (error) {
    commit('setLoading', false)
    commit('setError', error.message)
    throw error
  }
}