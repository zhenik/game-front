import {ListsService, UsersService} from "../../api";

export default {
  state: {
    lists: null,
    usersEmails: null,
    currentList: null
  },
  mutations: {
    setLists(state, payload) {
      state.lists = payload
    },
    setUsersEmails(state, payload) {
      state.usersEmails = payload
    },
    setCurrentList(state, payload) {
      state.currentList = payload
    }
  },
  actions: {
    async fetchLists({commit, rootState}) {
      // console.log("rootState " + JSON.stringify(rootState));
      const email = rootState.user.profile.email;
      // console.log("RootState email -> " + email);

      commit('setLoading', true);
      commit('clearError');
      ListsService.getLists(email)
          .then(response => {
            // console.log("email " + email);

            commit('setLoading', false);
            commit('setLists', response.data)
          })
          .catch(error => {
            commit('setLoading', false);
            commit('setError', error);
            console.log(error)
            commit('setLists', null);
          });
      return null; // release
    },
    async fetchUsersWithRoleUser({commit}) {
      commit('setLoading', true);
      commit('clearError');
      UsersService.getUsersWithRoleUser()
          .then(response => {
            const usersEmails = response.data.map(user => user.email);
            commit('setLoading', false);
            commit('setUsersEmails', usersEmails)
          })
          .catch(error => {
            commit('setLoading', false);
            commit('setError', error);
            console.log(error);
            commit('setUsersEmails', null);
          });
    },
    async createList(context, payload) {
      await ListsService.post(payload);
      context.dispatch('fetchLists')
      // return null;
    },
    async fetchCurrentList({commit}, listSlug) {
      commit('setLoading', true);
      commit('clearError');
      ListsService.get(listSlug)
          .then(response => {
            commit('setLoading', false);
            commit('setCurrentList', response.data);
          })
          .catch(error => {
            commit('setLoading', false);
            commit('setError', error);
            console.log(error)
            commit('setCurrentList', null);
      });
      return null; // release
    },
    cleanCurrentList({commit}) {
      commit('setCurrentList', null);
    }
  },
  getters: {
    lists(state) {
      return state.lists
    },
    getUsersEmails(state) {
      return state.usersEmails
    },
    getCurrentList(state) {
      return state.currentList;
    },
  }
}
