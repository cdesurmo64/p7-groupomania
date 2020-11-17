import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
      storage: window.sessionStorage,
    })],
  state: {
    user: {},
    isLoggedIn: false
  },
  getters: {
    isLoggedIn(state) {
      return state.isLoggedIn;
    },
    getUser(state) {
      return state.user;
    }
  },
  mutations: {
    // user
    SET_USER(state, user) {
      state.user = user;
    },
    LOG_IN(state) {
      state.isLoggedIn = true;
    }
  },
  actions: {
    // user
    setUser({ commit }, user) {
      commit("SET_USER", user);
    },
    logInUser({ commit }) {
      commit("LOG_IN");
    }
  }
})
