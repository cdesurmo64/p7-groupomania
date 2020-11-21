import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
import PostService from "../services/post.js"


Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
      storage: window.sessionStorage,
    })],
  state: {
    user: {},
    isLoggedIn: false,
    posts: []
  },
  getters: {
    // user
    isLoggedIn(state) {
      return state.isLoggedIn;
    },
    getUser(state) {
      return state.user;
    },

    // posts
    posts(state) {
      return state.posts;
    }
  },
  mutations: {
    // user
    SET_USER(state, user) {
      state.user = user;
    },
    LOG_IN(state) {
      state.isLoggedIn = true;
    },

    // posts
    GET_POSTS(state, posts) {
      state.posts = posts
    }
  },
  actions: {
    // user
    setUser({ commit }, user) {
      commit("SET_USER", user);
    },
    logInUser({ commit }) {
      commit("LOG_IN");
    },

    // posts
    getPosts({ commit }) {
      PostService.getAllPosts().then(response => {
        const posts = response.data;
        commit("GET_POSTS", posts)
      });
    }
  }
})
