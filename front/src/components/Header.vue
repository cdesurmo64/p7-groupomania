<template>
  <v-app-bar app elevate-on-scroll class="primary">
    <v-hover>
      <v-btn
          slot-scope="{ hover }"
          :to="`/posts`"
          aria-label="Page feed"
          title="Feed"
          icon
          class="ml-md-1 mr-md-2"
      >
        <v-icon
            v-if="hover"
            aria-label="Logo Groupomania blanc"
            role="img"
            aria-hidden="false"
            size="45px"
        >
          $vuetify.icons.redLogo
        </v-icon>
        <v-icon
            v-else
            aria-label="Logo Groupomania rouge"
            role="img"
            aria-hidden="false"
            size="45px"
        >
          $vuetify.icons.whiteLogo
        </v-icon>
      </v-btn>
    </v-hover>

    <v-hover
        v-slot="{ hover }">
      <v-btn
          :to="`/profils`"
          aria-label="Page annuaire des profils"
          title="Annuaire"
          icon
          class="mr-md-2"
      >
        <v-icon
            aria-label="Icone représentant deux personnes"
            role="img"
            aria-hidden="false"
            :color="hover ? 'accent2' : 'white'"
            size="37px"
        >
          mdi-account-supervisor-circle
        </v-icon>
      </v-btn>
    </v-hover>
    <v-spacer></v-spacer>

    <v-hover
        v-slot="{ hover }">
      <v-btn
          :to="`/profil/${user.id}`"
          aria-label="Page de mon profil"
          title="Mon profil"
          icon
          class="mr-md-2"
      >
        <span class="profile-avatar v-avatar" style="height: 45px; min-width: 45px; width: 45px;">
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
        </span>
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
            aria-label="Icone représentant la mise hors tension"
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
  computed: {
    ...mapState({
      errorMessage: "errorMessage",
      user: "user"
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

