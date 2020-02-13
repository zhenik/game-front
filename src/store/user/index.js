import * as firebase from 'firebase'
import { UsersService } from "../../api";

export default {
  state: {
    user: null,
    profile: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setProfile(state, profile) {
      state.profile = profile
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
                      commit('setProfile', response.data)
                    })
                .catch(
                    error => {
                      commit('setLoading', false);
                      commit('setError', error);
                      console.log(error)
                      // logout firebase, if authorization failed
                      firebase.auth().signOut();
                      commit('setUser', null);
                      commit('setProfile', null);
                    }
                );
            return null; // release promise
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
      commit('setProfile', null);
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    profile(state) {
      // console.log("state.profile "+JSON.stringify(state.profile));
      return state.profile
    },
    authenticatedAndAuthorized(state) {
      const authenticated   = (state.user !== null && state.user !== undefined);
      const authorized      = (state.profile !== null && state.profile !== undefined);
      return (authenticated && authorized);
    },
    isAdmin(state) {
      if (state.profile !== null && state.profile !== undefined) {
        if (state.profile.role === 'ADMIN'){
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    }
  }
}
