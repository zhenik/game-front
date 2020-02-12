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
            // console.log("Here "+ JSON.stringify(email))
            UsersService.getUser(email)
                .then(
                    response => {
                      console.log("My role is "+ response.data.role);
                      commit('setLoading', false);
                      commit('setRole', response.data.role)
                    })
                .catch(
                    error => {
                      commit('setLoading', false);
                      commit('setError', error);
                      console.log(error)
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
    // authorizeUser({commit}, email) {
    //   commit('setLoading', true);
    //   commit('clearError');
    //   UsersService.getUser(email)
    //       .then(
    //           response => {
    //           commit('setLoading', false);
    //           commit('setRole', response.role)
    //       })
    //       .catch(
    //           error => {
    //             commit('setLoading', false);
    //             commit('setError', error);
    //             console.log(error)
    //           }
    //       );
    // },
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
