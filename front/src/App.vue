<template>
  <v-app :style="{background: $vuetify.theme.themes[theme].background}">
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),
  computed:{
    theme(){
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    }
  }
};
</script>

<style lang="scss">
.v-card__text, .v-card__title {
  word-break: normal;
}
</style>
