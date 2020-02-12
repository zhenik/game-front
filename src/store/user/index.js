import * as firebase from 'firebase'
import { UsersService } from "../../api";

export default {
  state: {
    user: null,
    role: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setRole (state, role) {
      state.role = role
    }
  },
  actions: {
    signUserUp ({ commit }, payload) {
      commit('setLoading', true);
      commit('clearError');
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        // no than, we are not going to auth auto
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
                const newUser = {
                  id: response.user.uid,
                  name: response.user.displayName,
                  email: response.user.email,
                  photoUrl: response.user.photoURL,
                  token: response.user.getIdToken()
                };
                commit('setUser', newUser);
                return newUser.email;
              }
          )
          .then( email => {
            UsersService.getUser(email)
                .then(
                    response => {
                      commit('setLoading', false);
                      commit('setRole', response.data.role)
                    })
                .catch(
                    error => {
                      commit('setLoading', false);
                      commit('setError', error);
                      console.log(error)
                      // logout firebase, if authorization failed
                      firebase.auth().signOut();
                      commit('setUser', null);
                      commit('setRole', null);
                    }
                );
          })
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
      commit('setUser', null);
      commit('setRole', null);
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    userRole (state) {
      return state.role
    }
  }
}
