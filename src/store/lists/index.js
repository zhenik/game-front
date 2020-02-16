import {ListsService} from "../../api";

export default {
  state: {
    lists: null
  },
  mutations: {
    setLists(state, payload) {
      state.lists = payload
    }
  },
  actions: {
    fetchLists({commit, rootState}) {
      // console.log("rootState " + JSON.stringify(rootState));
      const email = rootState.user.profile.email;
      console.log("RootState email -> " + email);

      commit('setLoading', true);
      commit('clearError');
      ListsService.getLists(email).then(response => {
            console.log("email " + email);

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
    }
  },
  getters: {
    lists(state) {
      return state.lists
    }
  }
}
