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
    // user
    user: {},
    isLoggedIn: false,
    // posts
    posts: [],
    lastPostsOfUser: [],
    // errors
    errorMessage: null
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
    UPDATE_A_POST_IN_POSTS(state, updatedPost) {
      const targetIndex = state.posts.findIndex(post => post.id === updatedPost.id);
      Vue.set(state.posts, targetIndex, updatedPost);
    },
    SET_LAST_POSTS_OF_USER(state, lastPostsOfUser) {
      state.lastPostsOfUser = lastPostsOfUser
    },
    UPDATE_A_POST_IN_LAST_POSTS(state, updatedPost) {
      const targetIndex = state.lastPostsOfUser.findIndex(post => post.id === updatedPost.id);
      Vue.set(state.lastPostsOfUser, targetIndex, updatedPost);
    },
    // errors
    SET_ERROR_MESSAGE(state, error) {
      state.errorMessage = error.response.data.error;
    },
    UNSET_ERROR_MESSAGE(state) {
      state.errorMessage = null;
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
    async getPosts({ commit }) {
      await PostService.getAllPosts().then(response => {
        const posts = response.data;
        commit("SET_POSTS", posts);
      })
    },
    getLastPostsOfUser({ commit }, userId) {
      PostService.getLastPostsByUserId(userId).then(response => {
        const lastPostsOfUser = response.data;
        commit("SET_LAST_POSTS_OF_USER", lastPostsOfUser);
      })
    },
    getUpdatedPost({ commit }, payload) {
      PostService.getAPost(payload.postId).then(response => {
        const updatedPost = response.data;
        commit("UPDATE_A_POST_IN_POSTS", updatedPost)

        if (payload.isProfilePage) {
          commit("UPDATE_A_POST_IN_LAST_POSTS", updatedPost);
        }
      })
    },
    // errors
    setErrorMessage({ commit }, error) {
      commit("SET_ERROR_MESSAGE", error);
        setTimeout(() => {
            commit("UNSET_ERROR_MESSAGE")
        }, 5000);
    }
  }
})
