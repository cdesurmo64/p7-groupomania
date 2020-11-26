import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
import PostService from "../services/post.js"
import router from '../router'



Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.localStorage,
  })],
  state: {
    user: {},
    isLoggedIn: false,
    posts: [],
    postsErrorMessage: ""
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

    // posts
    GET_POSTS(state, posts) {
      state.posts = posts
    },
    SET_POSTS_ERROR_MESSAGE(state, error) {
      state.postsErrorMessage = error.response.data.error;

      setTimeout(() => {
        state.postsErrorMessage = null;
      }, 5000);
    }
    // ADD_A_POST_TO_POSTS(state, post) {
    //   state.posts.push(post)
    // }
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

    // posts
    getPosts({ commit, dispatch }) {
      PostService.getAllPosts().then(response => {
        const posts = response.data;
        commit("GET_POSTS", posts)
      }).catch(error => {
        commit("SET_POSTS_ERROR_MESSAGE", error);

        if (error.response.data.error === `L'authentification a échoué, vous allez être redirigé vers la page de connexion`) {
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
    // }
  }
})
