<template>
  <v-app-bar app elevate-on-scroll class="primary">
    <router-link to="/posts">
      <v-hover
      v-slot="{ hover }">
        <v-img
            :src="hover ? require('../assets/logo-red.svg') : require('../assets/logo-white.svg')"
            contain
            width="45px"
            alt="Logo Groupomania"
            class="ml-md-3"
        />
      </v-hover>
    </router-link>
    <v-spacer></v-spacer>

    <v-hover
        v-slot="{ hover }">
      <v-btn
          :to="`/profil/${user.id}`"
          icon
          class="mr-md-2"
      >
        <v-avatar size="45px" class="mr-3">
          <img
              v-if="user.photo"
              :src="user.photo"
              alt="Photo de mon profil"
          />
          <v-icon
              v-else
              aria-label="Mon profil"
              role="img"
              aria-hidden="false"
              :color="hover ? 'accent2' : 'white'"
              size="37px"
          >
            mdi-account-circle-outline
          </v-icon>
        </v-avatar>
      </v-btn>
    </v-hover>
  </v-app-bar>
</template>

<script>
export default {
name: "PageHeader",
  props: {
    user: {
      type: Object
    }
  },
}
</script>

<style scoped>

</style>
