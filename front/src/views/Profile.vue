<template>
  <v-container>
    <v-row>
      <v-col cols="12" offset-md="2" md="8">
        <v-alert v-if="errorMessage" type="error" icon="mdi-alert-circle" class="text-center font-weight-bold" color="accent"> {{ errorMessage }}</v-alert>
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

              <v-col cols="12" class="text-center">
                <div
                    v-if="user.id === $store.state.user.id"
                    class="delete-account-btn-wrapper d-flex flex-column justify-center align-center mt-3">
                  <v-btn
                      type="button"
                      @click="deleteAccount(user.id)"
                      rounded
                      width="210px"
                      class="align-center secondary"
                  >
                    Supprimer le compte
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-container>
          <v-alert v-if="deleteAccountErrorMessage" type="error" icon="mdi-alert-circle" class="text-center font-weight-bold" color="accent"> {{ deleteAccountErrorMessage }}</v-alert>
          <v-alert v-if="deleteAccountSuccessMessage" type="success" icon="mdi-checkbox-marked-circle" class="text-center font-weight-bold" color="accent1"> {{ deleteAccountSuccessMessage }} </v-alert>
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
      deleteAccountSuccessMessage: null,
      deleteAccountErrorMessage: null,
      errorMessage: null
    }
  },
  mounted() {
    const id = this.$route.params.id;
    UserService.getUserById(id).then(response => {
      this.user = response.data;
    }).catch(error => {
      this.errorMessage = error.response.data.error;
      setTimeout(() => {
        this.errorMessage = "";
      }, 10000);

      if (error.response.data.error === `L'authentification a échoué, vous allez être redirigé vers la page de connexion`) {
        setTimeout(() => {
          this.$store.dispatch("logOutUser");
          this.$router.push("/login");
        }, 5000);
      }
    })
  },
  computed: {
    userFullName() {
      return `${this.user.firstName} ${this.user.surname}`
    }
  },
  watch: {
    $route() {
      this.getUser();
    }
  },
  methods: {
    getUser() {
      const id = this.$route.params.id;
      UserService.getUserById(id).then(response => {
        this.user = response.data;
      }).catch(error => {
        this.errorMessage = error.response.data.error;
        setTimeout(() => {
          this.errorMessage = "";
        }, 10000);

        if (error.response.data.error === `L'authentification a échoué, vous allez être redirigé vers la page de connexion`) {
          setTimeout(() => {
            this.$store.dispatch("logOutUser");
            this.$router.push("/login");
          }, 5000);
        }
      })
    },
    deleteAccount(userId) {
      UserService.deleteAccount(userId).then((response) => {
        this.deleteAccountSuccessMessage = response.data.message;
        setTimeout(() => {
          this.deleteAccountSuccessMessage = "";
        }, 5000);

        if (this.user.id === this.$store.state.user.id) {
          this.deleteAccountSuccessMessage = "Votre compte a été supprimé, vous allez être redirigé vers la page d'accueil";
          setTimeout(() => {
            this.$store.dispatch("logOutUser");
            this.$router.push("/");
          }, 5000);
        }
      }).catch(error => {
        this.deleteAccountErrorMessage = error.response.data.error;
        setTimeout(() => {
          this.deleteAccountErrorMessage = "";
        }, 10000);

        if (error.response.data.error === `L'authentification a échoué, vous allez être redirigé vers la page de connexion`) {
          setTimeout(() => {
            this.$store.dispatch("logOutUser");
            this.$router.push("/login");
          }, 5000);
        }
      })
    }
  }
}

</script>

<style scoped>

</style>
