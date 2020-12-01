import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
import PostService from "../services/post.js"
import router from '../router'
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
    postsErrorMessage: "",
    updatedPostErrorMessage: "",
    updatedUserErrorMessage: ""
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
    },
    postsErrorMessage(state) {
      return state.postsErrorMessage;
    },
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
    SET_UPDATED_USER_ERROR_MESSAGE (state, error) {
      state.updatedUserErrorMessage = error.response.data.error;
      setTimeout(() => {
        state.updatedUserErrorMessage = null;
      }, 5000);
    },

    // posts
    GET_POSTS(state, posts) {
      state.posts = posts
    },
    SET_POSTS_ERROR_MESSAGE(state, error) {
      state.postsErrorMessage = error.response.data.error;
      setTimeout(() => {
        state.postsErrorMessage = null;
      }, 5000);
    },
    SET_UPDATED_POST_ERROR_MESSAGE (state, error) {
      state.updatedPostErrorMessage = error.response.data.error;
      setTimeout(() => {
        state.updatedPostErrorMessage = null;
      }, 5000);
    },
    // ADD_A_POST_TO_POSTS(state, post) {
    //   state.posts.push(post)
    // },
    UPDATE_A_POST_IN_POSTS(state, updatedPost) {
      const targetIndex = state.posts.findIndex(post => post.id === updatedPost.id);
      Vue.set(state.posts, targetIndex, updatedPost);
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
    updateCurrentUser({ commit, dispatch }, userId) {
      UserService.getUserById(userId).then(response => {
        const updatedCurrentUser = response.data;
        commit("SET_UPDATED_USER", updatedCurrentUser)
      }).catch(error => {
        commit("SET_UPDATED_USER_ERROR_MESSAGE", error);

        if (error.response.status === 403) {
          setTimeout(() => {
            dispatch("logOutUser");
            router.push('/login');
          }, 5000);
        }
      })
    },

    // posts
    getPosts({ commit, dispatch }) {
      PostService.getAllPosts().then(response => {
        const posts = response.data;
        commit("GET_POSTS", posts);
      }).catch(error => {
        commit("SET_POSTS_ERROR_MESSAGE", error);

        if (error.response.status === 403) {
          setTimeout(() => {
            dispatch("logOutUser");
            router.push('/login');
          }, 5000);
        }
      })
    },

    // addNewPostInPosts({ commit }, newPostId) {
    //   PostService.getAPost(newPostId).then(response => {
    //     const post = response.data;
    //     commit("ADD_A_POST_TO_POSTS", post)
    //   });
    // },

    getUpdatedPost({ commit, dispatch }, newPostId) {
      PostService.getAPost(newPostId).then(response => {
        const updatedPost = response.data;
        commit("UPDATE_A_POST_IN_POSTS", updatedPost)
      }).catch(error => {
        commit("SET_UPDATED_POST_ERROR_MESSAGE", error);

        if (error.response.status === 403) {
          setTimeout(() => {
            dispatch("logOutUser");
            router.push('/login');
          }, 5000);
        }
      })
    }
  }
})
