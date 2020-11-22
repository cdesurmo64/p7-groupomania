<template>
  <v-container>
    <v-row>
      <v-col cols="12" offset-md="2" md="8">
        <v-card class="profile-card my-5">
          <v-container fluid>
            <v-row>
              <v-col cols="12">
                <v-card-title class="text-h5 py-0 justify-center">
                  {{ userFullName }}
                </v-card-title>
              </v-col>

              <v-col cols="12" md="6" class="text-center">
                <v-avatar class="profile-avatar" size="200px" color="accent2">
                  <img
                      v-if="user.photo"
                      :src="user.photo"
                      alt="Photo de profil de cet utilisateur"
                  />
                  <v-icon
                      v-else
                      aria-label="Icone imageant le profil"
                      role="img"
                      aria-hidden="false"
                      dark
                      size="75px"
                  >
                    mdi-account-circle
                  </v-icon>
                </v-avatar>
              </v-col>

              <v-col cols="12" md="6" class="text-center d-flex flex-column justify-md-center">
                <p class="profile-email">
                 {{ user.email }}
                </p>

                <p v-if="user.bio" class="profile-bio">
                  {{ user.bio }}
                </p>

                <p v-else class="justify mb-0">
                  Aucune bio renseignée pour l'instant
                </p>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserService from "@/services/user";

export default {
  name: "Profile",
  props: {
  },
  data() {
    return {
      user: {
        type: Object
      },
      errorMessage: null,
    }
  },
  mounted() {
    const id = this.$route.params.id;
    UserService.getUserById(id).then(response => {
      this.user = response.data;
    }).catch(error => {
      this.errorMessage = error.response.data.error;
    })
  },
  computed: {
    userFullName() {
      return `${this.user.firstName} ${this.user.surname}`
    }
  }}

</script>

<style scoped>

</style>
