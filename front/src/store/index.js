import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
import PostService from "../services/post.js"
import UserService from "@/services/user";



Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.localStorage,
  })],
  state: {
    user: {},
    isLoggedIn: false,
    posts: [],
    errorMessage: null,
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
    LOG_OUT(state) {
      state.user = null;
      state.isLoggedIn = false;
    },
    SET_UPDATED_USER(state, updatedUser) {
      state.user = updatedUser;
    },

    // posts
    SET_POSTS(state, posts) {
      state.posts = posts
    },
    // ADD_A_POST_TO_POSTS(state, post) {
    //   state.posts.push(post)
    // },
    UPDATE_A_POST_IN_POSTS(state, updatedPost) {
      const targetIndex = state.posts.findIndex(post => post.id === updatedPost.id);
      Vue.set(state.posts, targetIndex, updatedPost);
    },

    // errors
    SET_ERROR_MESSAGE(state, error) {
      state.errorMessage = error.response.data.error;
      setTimeout(() => {
        state.errorMessage = null;
      }, 5000);
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
    logOutUser({ commit }) {
      commit("LOG_OUT");
      window.localStorage.removeItem('vuex');
      Vue.$cookies.remove('token');
    },
    updateCurrentUser({ commit }, userId) {
      UserService.getUserById(userId).then(response => {
        const updatedCurrentUser = response.data;
        commit("SET_UPDATED_USER", updatedCurrentUser)
      })
    },

    // posts
    getPosts({ commit }) {
      PostService.getAllPosts().then(response => {
        const posts = response.data;
        commit("SET_POSTS", posts);
      })
    },

    // addNewPostInPosts({ commit }, newPostId) {
    //   PostService.getAPost(newPostId).then(response => {
    //     const post = response.data;
    //     commit("ADD_A_POST_TO_POSTS", post)
    //   });
    // },

    getUpdatedPost({ commit }, newPostId) {
      PostService.getAPost(newPostId).then(response => {
        const updatedPost = response.data;
        commit("UPDATE_A_POST_IN_POSTS", updatedPost)
      })
    },

    // errors
    setErrorMessage({ commit }, error) {
      commit("SET_ERROR_MESSAGE", error);
    }
  }
})
