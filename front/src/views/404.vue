<template>
  <v-container>
    <v-row>
      <v-col cols="12" offset-md="2" md="8">
        <v-card class="post-card my-md-2">
          <v-card-title class="pt-10 pb-md-6 mx-4 justify-md-center text-center">
            <h1 class="text-h4 font-weight-black">La ressource recherchée est introuvable</h1>
          </v-card-title>
          <v-card-text class="mx-auto mt-4 pb-0">
            <p class="text-h1 text-center">404</p>
          </v-card-text>
          <v-card-actions class="actions-btn-wrapper d-flex justify-space-around mt-8 pb-8">
            <div class="go-feed">
              <v-btn
                  class="ma-2 secondary"
                  aria-label="Revenir au feed"
                  to="/posts"
              >
                <div class="pr-2">
                  Retour au feed
                </div>
                <v-icon
                    small
                    aria-label="Flèche vers la gauche"
                    role="img"
                    aria-hidden="false"
                >
                  mdi-arrow-left-circle
                </v-icon>
              </v-btn>
            </div>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
name: "error404"
}
</script>

<style scoped>

</style>
