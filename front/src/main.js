import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueCookies from 'vue-cookies'
import VueMoment from 'vue-moment'
import api from "./services/api";

const moment = require('moment')
require('moment/locale/fr')
Vue.use(VueMoment, { moment });

Vue.use(VueCookies)

Vue.config.productionTip = false

Vue.prototype.$http = api;

api.interceptors.response.use(
    response => {
      if (response.status === 200 || response.status === 201) {
        return Promise.resolve(response);
      }
    },
    error => {
        const isLoggedIn = store.state.isLoggedIn;

        if (error.response.status) {
          switch (error.response.status) {
              case 400:
                  store.dispatch("setErrorMessage", error);
                  break;
              case 401:
                  if (isLoggedIn) {
                      store.dispatch("setErrorMessage", error)
                      store.dispatch("logOutUser")
                      router.push("/login");
                      return false;
                  } else {
                      store.dispatch("setErrorMessage", error)
                      break;
                  }
              case 403:
                  store.dispatch("setErrorMessage", error);
                  break;
              case 404:
                  router.push("/404");
                  return false;
              case 429:
                  store.dispatch("setErrorMessage", error);
                  break;
              case 500:
                  store.dispatch("setErrorMessage", error);
                  break;
          }
        throw error;
      }
    }
);


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

