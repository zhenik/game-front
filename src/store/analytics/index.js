import {AnalyticsService} from "../../api";

const initialState = {
  topTenUsers:[],
  userAnalytics: {
    twoListsFeedback: {
      last: {
        questions: 0,
        score: 0,
        feedback: 0.0,
        group: {
          NO: 0,
          YES: 0,
          IRRELEVANT: 0,
          NONE: 0
        }
      },
      best: {
        questions: 0,
        score: 0,
        feedback: 0.0,
        group: {
          NO: 0,
          YES: 0,
          IRRELEVANT: 0,
          NONE: 0
        }
      }
    },
    allListsFeedback: {
      questions: 0,
      score: 0,
      feedback: 0.0,
      group: {
        IRRELEVANT: 0,
        NO: 0,
        YES: 0,
        NONE: 0
      }
    }
  }
};

export const state = { ...initialState };
export const actions = {
  async fetchUserAnalytics({commit, rootState}) {
    const email = rootState.user.profile.email;
    commit('setLoading', true);
    commit('clearError');
    AnalyticsService.getAnalytics(email)
        .then(response => {
          // console.log("data -> ", response.data)
          commit('setLoading', false);
          commit('setUserAnalytics', response.data)
        })
        .catch(error => {
          commit('setLoading', false);
          commit('setError', error);
          console.log(error)
          commit('setUserAnalytics', initialState.userAnalytics);
        });
    return null; // release
  },
  async fetchTopTenUsersAnalytics({commit}) {
    // const email = rootState.user.profile.email;
    AnalyticsService.getTopTen()
        .then(response => {
          // console.log("data -> ", response.data);
          commit('setLoading', false);
          commit('setTopTenUsersAnalytics', response.data)
        })
        .catch(error => {
          commit('setLoading', false);
          commit('setError', error);
          console.log(error)
          commit('setTopTenUsersAnalytics', initialState.topTenUsers);
        });
    commit('setLoading', true);
    commit('clearError');
    return null;
  },

};
export const mutations = {
  setUserAnalytics(state, payload) {
    state.userAnalytics = payload;
  },
  setTopTenUsersAnalytics(state, payload) {
    state.topTenUsers = payload;
  }
};
export const getters = {
  userAnalytics(state) {
    return state.userAnalytics
  },
  topTenUsersAnalytics(state) {
    return state.topTenUsers
  },
  doesUserHasAnalytics(state) {
    return state.userAnalytics.twoListsFeedback.last.questions !== 0
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
