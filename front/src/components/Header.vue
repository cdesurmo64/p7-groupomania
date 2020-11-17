<template>
  <v-app-bar app elevate-on-scroll class="primary">
    <router-link to="/">
      <v-hover
      v-slot="{ hover }">
        <v-img
            :src="hover ? require('../assets/logo-red.svg') : require('../assets/logo-white.svg')"
            contain
            width="45px"
            alt="Logo Groupomania"
        />
      </v-hover>
    </router-link>
    <v-spacer></v-spacer>

    <v-hover
        v-slot="{ hover }">
      <v-btn
          to="/profile"
          icon
      >
        <v-icon
            aria-label="Mon profile"
            role="img"
            aria-hidden="false"
            :color="hover ? 'accent2' : 'white'"
            size="37px"
        >
          mdi-account-circle-outline
        </v-icon>
      </v-btn>
    </v-hover>

  </v-app-bar>
</template>

<script>
export default {
name: "PageHeader"
}
</script>

<style scoped>

</style>
