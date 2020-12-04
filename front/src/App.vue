<template>
  <v-app :style="{background: $vuetify.theme.themes[theme].background}">
    <page-header v-if="isLoggedIn"></page-header>
    <v-main>
      <v-alert v-if="errorMessage && isLoggedIn === false" type="error" icon="mdi-alert-circle" class="text-center font-weight-bold d-block" color="accent"> {{ errorMessage }}</v-alert>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import PageHeader from "./components/Header.vue";
import { mapState } from "vuex";

export default {
  name: 'App',

  components: {
    PageHeader,
  },

  data: () => ({
    //
  }),
  computed: {
    theme() {
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    },
    ...mapState({
      errorMessage: "errorMessage",
      isLoggedIn: "isLoggedIn",
    })
  },
};
</script>

<style lang="scss">
.v-card__text, .v-card__title {
  word-break: normal;
}
</style>
