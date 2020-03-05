import {ListsService, UsersService} from "../../api";

const initialState = {
    lists: null,
    usersEmails: null,
    listSlug: '',
    currentList: {
      id: '',
      updatedAt: '',
      createdAt: null,
      assignedToEmail: '',
      assignedDate: null,
      delivered: null,
      deadline: null,
      questions: [],
      state: ''
    }
};

export const state = { ...initialState };
export const actions = {
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
      commit('setListSlug', listSlug);
      ListsService.get(listSlug)
          .then(response => {
            commit('setLoading', false);
            commit('setCurrentList', response.data);
          })
          .catch(error => {
            commit('setLoading', false);
            commit('setError', error);
            console.log(error);
            commit('setCurrentList', initialState.currentList);
            commit('setListSlug', initialState.listSlug);
      });
      return null; // release
    },
    // todo: async ?
    async updateList({ state }) {
      // console.log("Payload action -> "+JSON.stringify(state.currentList));
      // console.log("Slug action    -> "+JSON.stringify(state.listSlug));
      return ListsService.update(state.listSlug, state.currentList)
    },
    async deliverList(context) {
      context.commit("setListState", 'UNDER_REVIEW');
      // console.log("new state -> "+JSON.stringify(context.state))
      return ListsService.update(context.state.listSlug, context.state.currentList)
    },

    currentListResetState({commit}) {
      commit('setCurrentList', initialState.currentList);
      commit('setListSlug', initialState.listSlug);
    },
    listEditQuestionAnswer({ commit }, updatedQuestion){
      commit('answerQuestion', updatedQuestion)
    }
  }
export const mutations = {
    setLists(state, payload) {
      state.lists = payload
      // console.log("state -> "+JSON.stringify(state))
    },
    setListState(state, listState) {
      state.currentList.state = listState
    },
    setUsersEmails(state, payload) {
      state.usersEmails = payload
    },
    setListSlug(state, listSlug) {
      state.listSlug = listSlug
    },
    setCurrentList(state, payload) {
      state.currentList = payload
    },
    answerQuestion(state, updatedQuestion) {
      // console.log("Updated question -> "+JSON.stringify(updatedQuestion))
      state.currentList.questions.forEach((q, index) => {
        if (q.id === updatedQuestion.id) {
          state.currentList.questions[index] = updatedQuestion
        }
      })
    }
}
export const getters = {
    lists(state) {
      return state.lists
    },
    getUsersEmails(state) {
      return state.usersEmails
    },
    currentList(state) {
      return state.currentList;
    },
  }

export default {
  state,
  getters,
  actions,
  mutations
};
