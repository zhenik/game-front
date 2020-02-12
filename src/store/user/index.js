import * as firebase from 'firebase'

export default {
  state: {
    user: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    signUserUp ({ commit }, payload) {
      commit('setLoading', true);
      commit('clearError');
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          response => {
            commit('setLoading', false);
            const newUser = {
              id: response.user.uid,
              name: response.user.displayName,
              email: response.user.email,
              photoUrl: response.user.photoURL
            };
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false);
            commit('setError', error)
          }
        )
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true);
      commit('clearError');
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
          .then(
              response => {
                commit('setLoading', false);
                const newUser = {
                  id: response.user.uid,
                  name: response.user.displayName,
                  email: response.user.email,
                  photoUrl: response.user.photoURL,
                  token: response.user.getIdToken()
                };
                commit('setUser', newUser)
              }
          )
          .catch(
              error => {
                commit('setLoading', false);
                commit('setError', error);
                console.log(error)
              }
          )
    },
    logout ({commit}) {
      firebase.auth().signOut();
      commit('setUser', null)
    }
  },
  getters: {
    user (state) {
      return state.user
    }
  }
}
