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
            console.log(newUser);
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false);
            commit('setError', error)
          }
        )
    }
  },
  getters: {

  }
}
