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
            aria-label="Mon feed"
            title="Mon feed"
        />
      </v-hover>
    </router-link>
    <v-spacer></v-spacer>

    <v-hover
        v-slot="{ hover }">
      <v-btn
          :to="`/profil/${user.id}`"
          aria-label="Mon profil"
          title="Mon profil"
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
              aria-label="Icone de mon profil"
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

    <v-hover
        v-slot="{ hover }">
      <v-btn
          @click="logOut"
          icon
          aria-label="Se déconnecter"
          title="Se déconnecter"
          class="mr-md-1"
      >
        <v-icon
            aria-label="Icone déconnexion"
            role="img"
            aria-hidden="false"
            :color="hover ? 'accent2' : 'white'"
            size="37px"
        >
          mdi-power
        </v-icon>
      </v-btn>
    </v-hover>
    <v-alert v-if="errorMessage" type="error" icon="mdi-alert-circle" class="error-message text-center font-weight-bold d-block" color="accent"> {{ errorMessage }}</v-alert>
  </v-app-bar>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "PageHeader",
  props: {
    user: {
      type: Object
    }
  },
  computed: {
    ...mapState({
      errorMessage: "errorMessage"
    })
  },
  methods: {
    logOut() {
      this.$store.dispatch("logOutUser");
      this.$router.push("/login");
    }
  }
}
</script>

<style lang="scss" scoped>
.error-message {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
}
</style>

