<template>
  <v-app :style="{background: $vuetify.theme.themes[theme].background}">
    <page-header v-if="isLoggedIn"></page-header>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import PageHeader from "./components/Header.vue";

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
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
    },
  }
};
</script>

<style lang="scss">
.v-card__text, .v-card__title {
  word-break: normal;
}
</style>
