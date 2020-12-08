<template>
  <v-card class="post-card my-5">
    <v-card-title class="py-0">
      <v-container fluid class="pb-0 pb-md-3">
        <v-row class="align-center">
          <v-col cols="2" md="1">
            <v-btn
                :to="`/profil/${post.User.id}`"
                icon
            >
              <v-avatar class="author-photo profile-avatar" color="accent2" size="55px">
                <img
                    v-if="post.User.photo"
                    :src="post.User.photo"
                    alt="Photo de profil de l'auteur du post"
                />
                <v-icon
                    v-else
                    color="white"
                    aria-label="Profil de l'auteur du post"
                    role="img"
                    aria-hidden="false"
                >
                  mdi-account-circle
                </v-icon>
              </v-avatar>
            </v-btn>
          </v-col>

          <v-col cols="10" md="6">
            <div class="author-name text-h6 text-md-h5 font-weight-medium text-left ml-md-2">
              <a :href="`/profil/${post.User.id}`">
                {{ authorFullName }}
              </a>
            </div>
          </v-col>

          <v-col cols="12" offset-md="1" md="4" class="post-date-col pb-0 pb-md-3">
            <div class="post-date text-subtitle-2 text-md-h6 text-left text-md-right font-weight-light">
              {{ post.createdAt  | moment("D MMMM YYYY") }}
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card-title>

    <v-container fluid class="pa-0 pl-3 pb-6 mt-md-2">
      <v-row class="md-align-center">
        <v-col cols="9" class="pa-0 pl-3">
          <v-card-text class="post-content pa-0 pl-3">
            <p class="text-md-h6 black--text font-weight-regular mb-0">
              {{ post.text }}
            </p>
          </v-card-text>
        </v-col>
        <v-col cols="3" class="moderation-col pa-0">
          <v-card-actions
              v-if="(post.User.id === $store.state.user.id) || ($store.state.user.role === 'admin')"
              class="justify-end pt-0 pb-0"
          >
            <div class="post-moderation-btn-wrapper d-flex flex-column flex-md-row justify-center align-center mt-n9 mt-md-0">
              <v-hover
                  v-slot="{ hover }">
                <v-btn
                    type="button"
                    title="Éditer le post"
                    @click="showModeration = !showModeration"
                    rounded
                    icon
                    class="align-center white--text"
                    color="accent5"
                >
                  <v-icon
                      aria-label="Icone d'édition du post"
                      role="img"
                      aria-hidden="false"
                      :color="hover ? 'accent2' : 'accent5'"
                      size="37px"
                  >
                    mdi-circle-edit-outline
                  </v-icon>
                </v-btn>
              </v-hover>
              <v-hover
                  v-slot="{ hover }">
                <v-btn
                    type="button"
                    title="Supprimer le post"
                    @click="deletePost(post.id, post.User.id)"
                    rounded
                    icon
                    class="align-center ml-md-2"
                >
                  <v-icon
                      aria-label="Icone de suppression du commentaire"
                      role="img"
                      aria-hidden="false"
                      :color="hover ? 'accent2' : 'secondary'"
                      size="37px"
                  >
                    mdi-delete-circle-outline
                  </v-icon>
                </v-btn>
              </v-hover>
            </div>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-container>

    <v-expand-transition>
      <div
          v-show="showModeration"
          v-if="(post.User.id === $store.state.user.id) || ($store.state.user.role === 'admin')"
      >
        <v-form ref="form" formenctype="multipart/form-data" v-model="updatedPostIsValid" class="d-flex flex-column mb-7">
          <v-textarea
              label="Votre post mis à jour..."
              v-model="updatedPostText"
              :rules="updatedPostRules"
              required
              outlined
              class="mx-4 mx-md-16 px-md-3"
          ></v-textarea>
          <div class="update-post-btn-wrapper d-flex flex-column justify-center align-center">
            <v-btn
                type="submit"
                :disabled="!updatedPostIsValid"
                @click.prevent="updatePostText(post.id, post.User.id)"
                width="300px"
                class="updated-post-text-submit-btn align-center white--text"
                color="accent5"
            >
              Mettre à jour le post
            </v-btn>
          </div>
        </v-form>
        <v-alert v-if="updatedPostErrorMessage" type="error" icon="mdi-alert-circle" class="text-center font-weight-bold" color="accent"> {{ updatedCommentErrorMessage }}</v-alert>
      </div>
    </v-expand-transition>

    <v-img
        v-if="post.imageUrl"
        :src="post.imageUrl"
        alt="Image illustrant le post"
    >
    </v-img>

    <v-expand-transition>
      <div
          v-show="showModeration"
          v-if="((post.User.id === $store.state.user.id) || ($store.state.user.role === 'admin'))"
      >
        <v-form ref="form" formenctype="multipart/form-data" class="d-flex flex-column mt-7 mb-7 align-center">
          <label for="newPostPicture" class="pr-2 black--text">Sélectionnez une nouvelle image pour le post :</label>
          <input
              @change="uploadNewPostPicture"
              id="newPostPicture"
              type="file"
              accept="image/png, image/jpeg"
              ref="file"
              name="image"
              required
          />
          <div class="update-post-btn-wrapper d-flex flex-column justify-center align-center mt-5">
            <v-btn
                type="submit"
                :disabled="!pictureIsValid"
                @click.prevent="updatePostImage(post.id, post.User.id)"
                width="300px"
                class="updated-post-image-submit-btn align-center white--text"
                color="accent5"
            >
              Mettre à jour l'image
            </v-btn>
            <v-btn
                v-if="post.imageUrl"
                type="button"
                @click="removePostImage(post.id, post.User.id)"
                width="300px"
                class="delete-post-image-btn align-center mt-4 white--text secondary"
            >
              Supprimer l'image
            </v-btn>
          </div>
        </v-form>
        <v-alert v-if="updatedPostImageErrorMessage" type="error" icon="mdi-alert-circle" class="text-center font-weight-bold" color="accent"> {{ updatedPostImageErrorMessage }}</v-alert>
      </div>
    </v-expand-transition>

    <v-divider></v-divider>
    <v-alert v-if="updatedPostSuccessMessage" type="success" icon="mdi-checkbox-marked-circle" class="text-center font-weight-bold" color="accent1"> {{ updatedPostSuccessMessage }}</v-alert>

    <v-card-actions class="actions-btn-wrapper d-flex justify-space-around">
      <div class="likes">
        <v-btn
            @click="likeAndDislikePost(post.id)"
            class="ma-2"
            aria-label="Mettre un like"
            text
            icon
            color="accent3"
        >
          <div class="likes-number pr-1">
            {{ post.Likes.length }}
          </div>
          <v-icon>
            mdi-thumb-up
          </v-icon>
        </v-btn>
      </div>

      <div class="add-comment-wrapper text-center">
        <v-btn
            @click="show = !show"
            class="ma-2"
            text
            icon
            color="accent4"
        >
          <div class="comment-text pr-1">
            Commenter
          </div>
          <v-icon
              aria-label="Commenter"
              role="img"
              aria-hidden="false"
          >
            mdi-comment-processing-outline
          </v-icon>
        </v-btn>
      </div>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <v-form ref="form" v-model="isValid" autocomplete="off" class="d-flex flex-column flex-md-row align-md-center">
          <v-text-field
              label="Votre commentaire"
              v-model="comment"
              :rules="commentRules"
              required
              class="pt-8 pt-md-4 mx-4 mx-md-10"
          ></v-text-field>

          <div class="comment-form-btn-wrapper d-flex flex-column justify-center align-center pb-8 mt-5 mt-md-8">
            <v-btn
                :disabled="!isValid"
                type="submit"
                @click.prevent="submitComment(post.id)"
                rounded
                width="180px"
                class="login-submit-btn align-center secondary mr-md-5"
            >
              Poster
            </v-btn>
          </div>
        </v-form>
      </div>
    </v-expand-transition>

    <v-divider></v-divider>
    <v-alert v-if="commentSuccessMessage" type="success" icon="mdi-checkbox-marked-circle" class="text-center font-weight-bold" color="accent1"> {{ commentSuccessMessage }}</v-alert>
    <v-alert v-if="likeSuccessMessage" type="success" icon="mdi-checkbox-marked-circle" class="text-center font-weight-bold" color="accent1"> {{ likeSuccessMessage }}</v-alert>

    <div
        v-if="post.Comments.length > 0"
        class="comments-wrapper pb-2 pb-md-4"
    >
      <v-list
          three-line
          rounded>
      </v-list>
      <Comment
          v-for="comment in post.Comments"
          :key="comment.id"
          :comment="comment"
          :is-profile-page="isProfilePage"
      >
      </Comment>
    </div>
  </v-card>
</template>

<script>
import PostService from "@/services/post";
import Comment from "../components/Comment.vue";

export default {
  name: "Post",
  props: {
    post: {
      type: Object
    },
    lastPosts: {
      type: Object
    },
    isProfilePage: {
      type: Boolean
    }
  },
  components: {
    Comment,
  },
  data() {
    return {
      likeSuccessMessage: null,
      show: false,
      isValid: true,
      commentSuccessMessage: null,
      comment: "",
      commentRules: [
        (v) => !!v || "Veuillez saisir un commentaire"
      ],
      showModeration: false,
      updatedPostText: this.post.text,
      updatedPostRules: [
        (v) => !!v || "Veuillez saisir un commentaire"
      ],
      updatedPostIsValid: true,
      updatedPostSuccessMessage: null,
      updatedPostErrorMessage: null,
      newPostPicture: null,
      pictureIsValid: false,
      updatedPostImageErrorMessage: null
    }
  },
  computed: {
    authorFullName() {
      return `${this.post.User.firstName} ${this.post.User.surname}`
    }
  },
  methods: {
    likeAndDislikePost(postId) {
      PostService.likeAPost(postId).then(response => {
        this.likeSuccessMessage = response.data.message;
        setTimeout(() => {
          this.likeSuccessMessage = "";
        }, 5000);

        const payload = {
          postId: postId,
          isProfilePage: this.isProfilePage
        };
        this.$store.dispatch("getUpdatedPost", payload);
      })
    },
    submitComment(postId) {
      PostService.commentAPost(postId, {
        comment: this.comment
      }).then(response => {
        this.show = false;
        this.comment = "";
        this.commentSuccessMessage = response.data.message;
        setTimeout(() => {
          this.commentSuccessMessage = "";
        }, 5000);

        const payload = {
          postId: postId,
          isProfilePage: this.isProfilePage
        };
        this.$store.dispatch("getUpdatedPost", payload);
      })
    },
    updatePostText(postId, userId) {
      if (this.updatedPostText) {
        PostService.updatePostText(postId, {
          userId: userId,
          text: this.updatedPostText
        }).then(response => {
          this.updatedPostText = null;
          this.showModeration = false;
          this.updatedPostSuccessMessage = response.data.message;
          setTimeout(() => {
            this.updatedPostSuccessMessage = "";
          }, 5000);

          const payload = {
            postId: postId,
            isProfilePage: this.isProfilePage
          };
          this.$store.dispatch("getUpdatedPost", payload);
        })
      } else {
        this.updatedPostErrorMessage = `Veuillez écrire un commentaire`;
        setTimeout(() => {
          this.updatedPostErrorMessage = null;
        }, 5000);
      }
    },
    uploadNewPostPicture() {
      this.newPostPicture = this.$refs.file.files[0];
      this.pictureIsValid = !!this.newPostPicture;
    },
    updatePostImage(postId, userId) {
      if (this.newPostPicture) {
        const formData = new FormData();
        formData.append("userId", userId);
        formData.append("image", this.newPostPicture);

        PostService.updatePostImage(postId, formData).then(response => {
          this.newProfilePicture = null;
          this.pictureIsValid = false;
          this.showModeration = false;
          this.updatedPostSuccessMessage = response.data.message;
          setTimeout(() => {
            this.updatedPostSuccessMessage = "";
          }, 5000);

          const payload = {
            postId: postId,
            isProfilePage: this.isProfilePage
          };
          this.$store.dispatch("getUpdatedPost", payload);
        })
      } else {
        this.updatedPostImageErrorMessage = `Veuillez sélectionner une image`;
        setTimeout(() => {
          this.updatedPostImageErrorMessage = "";
        }, 5000);
      }
    },
    removePostImage(postId, userId) {
      PostService.removePostImage(postId, {
        userId: userId,
      }).then((response) => {
        this.showModeration = false;
        this.updatedPostSuccessMessage = response.data.message;
        setTimeout(() => {
          this.updatedPostSuccessMessage = "";
        }, 5000);

        const payload = {
          postId: postId,
          isProfilePage: this.isProfilePage
        };
        this.$store.dispatch("getUpdatedPost", payload);
      })
    },
    deletePost(postId, userId) {
      PostService.deletePost(postId, {
        userId: userId,
      }).then((res) => {
        console.log(res.data.message);
        this.$store.dispatch("getPosts");
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$avatar-border-radius: 50% !default;
a {
  text-decoration: none;

  &:link, &:visited, &:hover, &:active {
    color: black;
  }
}
.post-date-col {
  padding-left: 10px!important;
}
.post-content {
  font-size: 18px;
}
.moderation-col {
  padding-right: 22px!important;
}
</style>
