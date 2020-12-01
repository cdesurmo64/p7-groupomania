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

                <v-expand-transition>
                  <div v-show="show">
                    <v-form ref="form" formenctype="multipart/form-data" class="d-flex flex-column align-center mt-6">
                      <label for="newProfilePicture" class="pr-2 black--text">Sélectionnez une nouvelle photo de profil :</label>
                      <input
                          @change="uploadProfilePicture"
                          id="newProfilePicture"
                          type="file"
                          accept="image/png, image/jpeg"
                          ref="file"
                          name="image"
                          required
                      />
                      <div class="update-profile-picture-btn-wrapper d-flex flex-column justify-center align-center pb-4 pb-md-4 mt-6">
                        <v-btn
                            type="submit"
                            :disabled="!pictureIsValid"
                            @click.prevent="updateProfilePicture(user.id)"
                            width="180px"
                            class="profile-photo-submit-btn align-center white--text"
                            color="accent5"
                        >
                          Changer de photo
                        </v-btn>
                      </div>
                    </v-form>
                    <v-alert v-if="profilePictureErrorMessage" type="error" icon="mdi-alert-circle" class="text-center font-weight-bold" color="accent"> {{ profilePictureErrorMessage }}</v-alert>
                  </div>
                </v-expand-transition>
              </v-col>

              <v-col cols="12" md="6" class="text-center d-flex flex-column justify-md-center">
                <p class="profile-email">
                 {{ user.email }}
                </p>

                <p v-if="user.bio" class="profile-bio mb-0 font-weight-medium">
                  {{ user.bio }}
                </p>

                <p v-else class="justify mb-0 font-weight-medium">
                  Aucune bio renseignée pour l'instant
                </p>

                <v-expand-transition>
                  <div v-show="show">
                    <v-form ref="form" formenctype="multipart/form-data" v-model="bioIsValid" class="d-flex flex-column mt-6 mb-3 mb-md-0">
                      <v-textarea
                          label="Ecrivez votre bio..."
                          v-model="newProfileBio"
                          :rules="newProfileBioRules"
                          required
                          outlined
                          class="mx-4 mx-md-10"
                      ></v-textarea>
                      <div class="update-profile-bio-btn-wrapper d-flex flex-column justify-center align-center mt-1 mt-md-4">
                        <v-btn
                            type="submit"
                            :disabled="!bioIsValid"
                            @click.prevent="updateProfileBio(user.id)"
                            width="220px"
                            class="profile-photo-submit-btn align-center white--text"
                            color="accent5"
                        >
                          Mettre à jour la bio
                        </v-btn>
                      </div>
                    </v-form>
                  </div>
                </v-expand-transition>
              </v-col>

              <v-col cols="12" class="text-center">
                <div
                    v-if="user.id === $store.state.user.id"
                    class="edit-profile-btn-wrapper d-flex flex-column justify-center align-center mt-3">
                  <v-btn
                      type="button"
                      @click="show = !show"
                      rounded
                      width="210px"
                      class="align-center white--text"
                      color="accent5"
                  >
                    <div class="comment-text pr-1">
                      Éditer le profil
                    </div>
                  </v-btn>
                </div>

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
          <v-alert v-if="profileActionErrorMessage" type="error" icon="mdi-alert-circle" class="text-center font-weight-bold" color="accent"> {{ profileActionErrorMessage }}</v-alert>
          <v-alert v-if="updatedUserErrorMessage" type="error" icon="mdi-alert-circle" class="text-center font-weight-bold" color="accent"> {{ updatedUserErrorMessage }}</v-alert>
          <v-alert v-if="profileActionSuccessMessage" type="success" icon="mdi-checkbox-marked-circle" class="text-center font-weight-bold" color="accent1"> {{ profileActionSuccessMessage }} </v-alert>
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
      show: false,
      newProfilePicture: null,
      pictureIsValid: false,
      newProfileBio: null,
      bioIsValid: true,
      newProfileBioRules: [
        (v) => !!v || "Veuillez écrire quelque chose"
      ],
      profileActionSuccessMessage: null,
      profileActionErrorMessage: null,
      profilePictureErrorMessage: null,
      errorMessage: null,
      updatedUserErrorMessage: null
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

      if (error.response.status === 404) {
        this.$router.push("/404");
      }

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

        if (error.response.status === 404) {
          this.$router.push("/404");
        }

        if (error.response.data.error === `L'authentification a échoué, vous allez être redirigé vers la page de connexion`) {
          setTimeout(() => {
            this.$store.dispatch("logOutUser");
            this.$router.push("/login");
          }, 5000);
        }
      })
    },
    uploadProfilePicture() {
      this.newProfilePicture = this.$refs.file.files[0];
      this.pictureIsValid = !!this.newProfilePicture;
    },
    updateProfilePicture(userId) {
      const id = userId;
      const formData = new FormData();
      formData.append("userId", id);

      if (this.newProfilePicture) {
        formData.append("image", this.newProfilePicture);

        UserService.updateProfilePicture(id, formData).then(response => {
          this.newProfilePicture = null;
          this.profileActionSuccessMessage = response.data.message;
          setTimeout(() => {
            this.profileActionSuccessMessage = "";
          }, 5000);

          if (this.user.id === this.$store.state.user.id) {
            this.$store.dispatch("updateCurrentUser", id);
          }
          this.show = false;
          this.getUser();
        }).catch(error => {
          this.profileActionErrorMessage = error.response.data.error;
          setTimeout(() => {
            this.profileActionErrorMessage = "";
          }, 10000);

          if (error.response.data.error === `L'authentification a échoué, vous allez être redirigé vers la page de connexion`) {
            setTimeout(() => {
              this.$store.dispatch("logOutUser");
              this.$router.push("/login");
            }, 5000);
          }
        })
      } else {
        this.profilePictureErrorMessage = `Veuillez sélectionner une photo`
        setTimeout(() => {
          this.profilePictureErrorMessage = "";
        }, 5000);
      }
    },
    updateProfileBio(userId) {
      if (this.newProfileBio) {
        UserService.updateProfileBio(userId, {
          userId: userId,
          text: this.newProfileBio
        }).then(response => {
          this.newProfileBio = null;
          this.profileActionSuccessMessage = response.data.message;
          setTimeout(() => {
            this.profileActionSuccessMessage = "";
          }, 5000);

          if (this.user.id === this.$store.state.user.id) {
            this.$store.dispatch("updateCurrentUser", userId);
          }
          this.show = false;
          this.getUser();
        }).catch(error => {
          this.profileActionErrorMessage = error.response.data.error;
          setTimeout(() => {
            this.profileActionErrorMessage = "";
          }, 10000);

          if (error.response.data.error === `L'authentification a échoué, vous allez être redirigé vers la page de connexion`) {
            setTimeout(() => {
              this.$store.dispatch("logOutUser");
              this.$router.push("/login");
            }, 5000);
          }
        })
      }
    },
    deleteAccount(userId) {
      UserService.deleteAccount(userId).then((response) => {
        this.profileActionSuccessMessage = response.data.message;
        setTimeout(() => {
          this.profileActionSuccessMessage = "";
        }, 5000);

        if (this.user.id === this.$store.state.user.id) {
          this.profileActionSuccessMessage = "Votre compte a été supprimé, vous allez être redirigé vers la page d'accueil";
          setTimeout(() => {
            this.$store.dispatch("logOutUser");
            this.$router.push("/");
          }, 5000);
        }
      }).catch(error => {
        this.profileActionErrorMessage = error.response.data.error;
        setTimeout(() => {
          this.profileActionErrorMessage = "";
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
