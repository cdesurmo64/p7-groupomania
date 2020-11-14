<template>
  <div class="home primary">
    <v-container>
      <v-row>
        <v-col cols="12" md="7">
          <v-card class="website-presentation d-flex flex-column justify-space-around primary white--text" height="100%" outlined>
            <v-card-title class="mb-5">
              <h1 class="text-h4 text-center">Bienvenue sur le réseau social de Groupomania !</h1>
            </v-card-title>
            <div class="connect-colleagues d-flex align-baseline">
              <v-icon
                  size="30px"
                  color="white"
                  class="mr-4"
              >
                mdi-account-group
              </v-icon>
              <span class="text-h5">
                Échangez plus avec vos collègues
              </span>
            </div>
            <div class="share-news d-flex align-end">
              <v-icon
                  size="30px"
                  color="white"
                  class="mr-4"
              >
                mdi-newspaper-variant-multiple-outline
              </v-icon>
              <span class="text-h5">
                Partagez des news
              </span>
            </div>
            <div class="share-images d-flex align-end">
              <v-icon
                  size="30px"
                  color="white"
                  class="mr-4"
              >
                mdi-folder-multiple-image
              </v-icon>
              <span class="text-h5">
                Partagez des photos
              </span>
            </div>
          </v-card>
        </v-col>

        <v-col cols="12" md="5">
          <v-card class="white">
            <v-img
                :src="require('../assets/logo-name-blue-centered.svg')"
                class="mx-2"
                contain
                height="150"
                alt="logo"
            />

            <div class="welcome-buttons d-flex flex-column align-center">
              <v-btn to="/signup" rounded class="secondary" width="180px">
                S'inscrire
              </v-btn>

              <v-btn mx-10 to="/login" rounded class="secondary mt-6 mb-10" width="180px">
                Se connecter
              </v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {}
}
</script>

<style lang="scss" scoped>
.v-card__text, .v-card__title {
  word-break: normal;
}
</style>
