<template>
  <v-container>
    <v-row>
      <v-col cols="12" offset-md="2" md="8">
        <v-card class="profile-card mt-5 mb-16">
          <v-container fluid>
            <v-row>
              <v-col cols="12">
                <v-card-title class="py-0 justify-center">
                  <h1 class="text-h5 text-center">Profil de <span class="font-weight-black">{{ userFullName }}</span></h1>
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
                      color="white"
                      size="90px"
                  >
                    mdi-account-circle
                  </v-icon>
                </v-avatar>

                <v-expand-transition>
                  <div v-show="showEditProfile" v-if="(user.id === $store.state.user.id) || ($store.state.user.role === 'admin')">
                    <v-form ref="form" enctype="multipart/form-data" class="d-flex flex-column align-center mt-6">
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
                        <v-btn
                            v-if="user.photo"
                            type="button"
                            @click="removeProfilePicture(user.id)"
                            width="180px"
                            class="profile-photo-submit-btn align-center mt-4 white--text secondary"
                        >
                          Supprimer la photo
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
                  <div v-show="showEditProfile" v-if="(user.id === $store.state.user.id) || ($store.state.user.role === 'admin')">
                    <v-form ref="form" enctype="multipart/form-data" v-model="bioIsValid" class="d-flex flex-column mt-6 mb-3 mb-md-0">
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
                    <v-alert v-if="profileBioErrorMessage" type="error" icon="mdi-alert-circle" class="text-center font-weight-bold" color="accent"> {{ profileBioErrorMessage }}</v-alert>
                  </div>
                </v-expand-transition>
              </v-col>

              <v-col
                  v-if="(user.id === $store.state.user.id) || ($store.state.user.role === 'admin')"
                  cols="12"
                  class="text-center"
              >
                <div class="edit-profile-btn-wrapper d-flex flex-column justify-center align-center mt-3">
                  <v-btn
                      type="button"
                      @click="showEditProfile = !showEditProfile"
                      rounded
                      width="210px"
                      class="align-center white--text"
                      color="accent5"
                  >
                    <span>
                      Éditer le profil
                    </span>
                  </v-btn>
                </div>

                <div class="delete-account-btn-wrapper d-flex flex-column justify-center align-center mt-3">
                  <v-btn
                      type="button"
                      @click="showDeleteProfile = !showDeleteProfile"
                      rounded
                      width="210px"
                      class="align-center secondary"
                  >
                    Supprimer le compte
                  </v-btn>
                  <v-expand-transition>
                    <div v-show="showDeleteProfile"
                         v-if="(user.id === $store.state.user.id) || ($store.state.user.role === 'admin')"
                         class="mt-5"
                    >
                      <v-alert icon="mdi-head-question-outline" outlined class="delete-alert text-center font-weight-bold" color="secondary">
                        <p class="ml-n4 ml-md-0">Êtes-vous sûr(e) de vouloir supprimer ce compte ?</p>
                        <div class="delete-btn-wrapper d-flex justify-center align-content-space-between">
                          <v-btn
                              type="button"
                              @click="deleteAccount(user.id)"
                              aria-label="Confirmer la suppression"
                              rounded
                              width="20px"
                              class="align-center secondary ml-n9"
                          >
                            OUI
                          </v-btn>
                          <v-btn
                              type="button"
                              @click="showDeleteProfile = !showDeleteProfile"
                              aria-label="Annuler la suppression"
                              rounded
                              width="20px"
                              class="align-center primary ml-4"
                          >
                            NON
                          </v-btn>
                        </div>
                      </v-alert>
                    </div>
                  </v-expand-transition>
                </div>
              </v-col>
            </v-row>
          </v-container>
          <v-alert v-if="profileActionSuccessMessage" type="success" icon="mdi-checkbox-marked-circle" class="text-center font-weight-bold" color="accent1"> {{ profileActionSuccessMessage }}</v-alert>
        </v-card>

        <v-card
            v-if="lastPosts.length > 0"
            class="last-posts-title-card">
          <v-card-title class="pt-8 pb-md-6 justify-md-center text-center">
            <h2 class="text-h5">Découvrez les <span class="font-weight-black">derniers posts</span> de <span class="font-weight-black">{{ userFullName }}</span> :</h2>
          </v-card-title>
        </v-card>

        <Post
            v-for="post in lastPosts"
            :key="post.id"
            :post="post"
            :id="post.id"
            :is-profile-page="isProfilePage"
        >
        </Post>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Post from "../components/Post.vue";
import UserService from "@/services/user";
import store from '../store/index';
import { mapState } from "vuex";

export default {
  name: "Profile",
  components: {
    Post
  },
  data() {
    return {
      // user
      user: {
        type: Object
      },
      showEditProfile: false,
      showDeleteProfile: false,
      newProfilePicture: null,
      pictureIsValid: false,
      newProfileBio: null,
      bioIsValid: true,
      newProfileBioRules: [
        (v) => !!v || "Veuillez écrire quelque chose"
      ],
      profileBioErrorMessage: null,
      profilePictureErrorMessage: null,
      profileActionSuccessMessage: null,
      isProfilePage: true,
    }
  },
  beforeRouteEnter (to, from, next) {
    store.dispatch('getLastPostsOfUser').then(() => next())
  },
  created() {
    const id = this.$route.params.id;
    UserService.getUserById(id).then(response => {
      this.user = response.data;
    });
    this.$store.dispatch("getLastPostsOfUser", id);
  },
  computed: {
    ...mapState({
      lastPosts: "lastPostsOfUser",
    }),
    userFullName() {
      return `${this.user.firstName} ${this.user.surname}`
    }
  },
  watch: {
    $route() {
      this.getUser();
      this.getLastPostsOfUser();
    }
  },
  methods: {
    getUser() {
      const id = this.$route.params.id;
      UserService.getUserById(id).then(response => {
        this.user = response.data;
      })
    },
    getLastPostsOfUser() {
      const id = this.$route.params.id;
      this.$store.dispatch("getLastPostsOfUser", id);
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
          this.pictureIsValid = false;
          this.profileActionSuccessMessage = response.data.message;
          setTimeout(() => {
            this.profileActionSuccessMessage = "";
          }, 5000);

          if (this.user.id === this.$store.state.user.id) {
            this.$store.dispatch("updateCurrentUser", id);
          }
          this.showEditProfile = false;
          this.getUser();
          this.getLastPostsOfUser();
        })
      } else {
        this.profilePictureErrorMessage = `Veuillez sélectionner une photo`
        setTimeout(() => {
          this.profilePictureErrorMessage = "";
        }, 5000);
      }
    },
    removeProfilePicture(userId) {
      UserService.removeProfilePicture(userId, {
        userId: userId,
      }).then(response => {
        this.profileActionSuccessMessage = response.data.message;
        setTimeout(() => {
          this.profileActionSuccessMessage = "";
        }, 5000);

        if (this.user.id === this.$store.state.user.id) {
          this.$store.dispatch("updateCurrentUser", userId);
        }
        this.showEditProfile = false;
        this.getUser();
        this.getLastPostsOfUser();
      })
    },
    updateProfileBio(userId) {
      if (this.newProfileBio) {
        UserService.updateProfileBio(userId, {
          userId: userId,
          text: this.newProfileBio
        }).then(response => {
          this.showEditProfile = false;
          this.getUser();
          this.profileActionSuccessMessage = response.data.message;
          setTimeout(() => {
            this.profileActionSuccessMessage = "";
          }, 5000);

          if (this.user.id === this.$store.state.user.id) {
            this.$store.dispatch("updateCurrentUser", userId);
          }
        })
      } else {
        this.profileBioErrorMessage = `Veuillez écrire une bio`;
        setTimeout(() => {
          this.profileBioErrorMessage = null;
        }, 5000);
      }
    },
    deleteAccount(userId) {
      UserService.deleteAccount(userId).then(() => {
        this.showDeleteProfile = false;
        if (this.user.id === this.$store.state.user.id) {
          this.profileActionSuccessMessage = "Votre compte a été supprimé, vous allez être redirigé vers la page d'accueil";
          setTimeout(() => {
            this.profileActionSuccessMessage = "";
            this.$store.dispatch("logOutUser");
            this.$router.push("/");
          }, 5000);
        } else {
          this.profileActionSuccessMessage = "Le compte de l'utilisateur a été supprimé, vous allez être redirigé vers le feed";
          setTimeout(() => {
            this.profileActionSuccessMessage = "";
            this.$router.push("/posts");
          }, 5000);
        }
      })
    }
  }
}

</script>

<style scoped>

</style>
