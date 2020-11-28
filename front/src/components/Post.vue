<template>
  <v-card class="post-card my-5">
    <v-card-title class="py-0">
      <v-container fluid class="pb-0 pb-md-3">
        <v-row class="align-center">
          <v-col cols="3" md="1">
            <v-avatar class="author-photo" color="accent2" size="55px">
              <img
                  v-if="post.User.photo"
                  :src="post.User.photo"
                  alt="Photo de profil de l'auteur du post"
              />
              <v-icon
                  v-else
                  dark
                  aria-label="Profil de l'auteur du post"
                  role="img"
                  aria-hidden="false"
              >
                mdi-account-circle
              </v-icon>
            </v-avatar>
          </v-col>

          <v-col cols="9" md="6">
            <div class="author-name text-h6 text-left ml-md-2">
              {{ authorFullName }}
            </div>
          </v-col>

          <v-col cols="12" offset-md="1" md="4" class="pb-0 pb-md-3">
            <div class="post-date text-subtitle-2 text-md-h6 text-left text-md-right font-weight-light">
              {{ post.createdAt  | moment("D MMMM YYYY") }}
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card-title>

    <v-card-text class="post-content pl-7">
      <p class="text-subtitle-1 text-md-h6 black--text font-weight-regular">
        {{ post.text }}
      </p>
    </v-card-text>

    <v-img
        v-if="post.imageUrl"
        :src="post.imageUrl"
        alt="Image illustrant le post"
    >
    </v-img>

    <v-divider></v-divider>

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
    <v-alert v-if="commentErrorMessage" type="error" icon="mdi-alert-circle" class="text-center font-weight-bold" color="accent"> {{ commentErrorMessage }}</v-alert>
    <v-alert v-if="commentSuccessMessage" type="success" icon="mdi-checkbox-marked-circle" class="text-center font-weight-bold" color="accent1"> {{ commentSuccessMessage }}</v-alert>
    <v-alert v-if="likeSuccessMessage" type="success" icon="mdi-checkbox-marked-circle" class="text-center font-weight-bold" color="accent1"> {{ likeSuccessMessage }}</v-alert>
    <v-alert v-if="likeErrorMessage" type="error" icon="mdi-alert-circle" class="text-center font-weight-bold" color="accent"> {{ likeErrorMessage }}</v-alert>


    <div class="comments-wrapper">
      <v-list
          v-for="comment in post.Comments"
          :key = "comment.id"
          :comment="comment"
          three-line
          rounded>
        <template>
          <v-list-item>
            <v-list-item-avatar class="comment-photo mr-4" color="accent2" size="55px">
              <img
                  v-if="comment.User.photo"
                  :src="comment.User.photo"
                  alt="Photo de profil de l'auteur du commentaire"
              />
              <v-icon
                  v-else
                  dark
                  aria-label="Profil de l'auteur du commentaire"
                  role="img"
                  aria-hidden="false"
              >
                mdi-account-circle
              </v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title class="font-weight-medium">
                {{ comment.User.firstName }}
              </v-list-item-title>
              <v-list-item-subtitle class="comment-date">
                {{ comment.createdAt | moment("from", "now") }}
              </v-list-item-subtitle>
              <div class="comment-content">
                {{ comment.message }}
              </div>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </div>
  </v-card>
</template>

<script>
import PostService from "@/services/post";

export default {
  name: "Post",
  props: {
    post: {
      type: Object
    }
  },
  data() {
    return {
      likeErrorMessage: null,
      likeSuccessMessage: null,
      show: false,
      isValid: true,
      commentErrorMessage: null,
      commentSuccessMessage: null,
      comment: "",
      commentRules: [
        (v) => !!v || "Veuillez saisir un commentaire"
      ],
      postsErrorMessage: null
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

        // this.$store.dispatch("getPosts")
        this.$store.dispatch("getUpdatedPost", postId);

      }).catch(error => {
        this.likeErrorMessage = error.response.data.error;
        setTimeout(() => {
          this.likeErrorMessage = "";
        }, 10000);

        if (error.response.data.error === `L'authentification a échoué, vous allez être redirigé vers la page de connexion`) {
          setTimeout(() => {
            this.$store.dispatch("logOutUser");
            this.$router.push("/login");
          }, 5000);
        }
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

        // this.$store.dispatch("getPosts")
        this.$store.dispatch("getUpdatedPost", postId)

      }).catch(error => {
        this.commentErrorMessage = error.response.data.error;
        setTimeout(() => {
          this.commentErrorMessage = "";
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

<style lang="scss" scoped>
$avatar-border-radius: 50% !default;
</style>
