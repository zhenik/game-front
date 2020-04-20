export default {
  state: {
    loading: false,
    error: null,
    gamefication: process.env.VUE_APP_GAMEFICATION === "true" ? true : false,
  },
  mutations: {
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    clearError ({ commit }) {
      commit('clearError')
    },
    setError ({ commit }, payload) {
      commit('setError', payload)
    }
  },
  getters: {
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    },
    gamefication(state) {
      return state.gamefication
    }
  }
}
