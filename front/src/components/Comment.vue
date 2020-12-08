<template>
  <div class="comment">
    <v-list-item class="ml-3">
      <v-btn
          :to="`/profil/${comment.UserId}`"
          icon
          class="mr-4"
      >
        <v-list-item-avatar class="comment-photo profile-avatar mr-4" color="accent2" size="55px">
          <img
              v-if="comment.User.photo"
              :src="comment.User.photo"
              alt="Photo de profil de l'auteur du commentaire"
          />
          <v-icon
              v-else
              color="white"
              aria-label="Profil de l'auteur du commentaire"
              class="comment-author-icon"
              role="img"
              aria-hidden="false"
              size="24px"
          >
            mdi-account-circle
          </v-icon>
        </v-list-item-avatar>
      </v-btn>

      <v-list-item-content>
        <v-list-item-title class="font-weight-medium">
          <a :href="`/profil/${comment.UserId}`">
            {{ comment.User.firstName }}
          </a>
        </v-list-item-title>

        <v-list-item-subtitle class="comment-date">
          {{ comment.createdAt | moment("from", "now") }}
        </v-list-item-subtitle>
        <div class="comment-content">
          {{ comment.message }}
        </div>
      </v-list-item-content>

      <v-list-item-action
          v-if="(comment.UserId === $store.state.user.id) || ($store.state.user.role === 'admin')"
      >
        <div class="comment-action-btn-wrapper d-flex flex-column flex-md-row justify-center align-center mt-3">
          <v-hover
              v-slot="{ hover }">
            <v-btn
                type="button"
                title="Éditer le commentaire"
                @click="show = !show"
                rounded
                icon
                class="align-center white--text"
                color="accent5"
            >
              <v-icon
                  aria-label="Icone d'édition du commentaire"
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
                title="Supprimer le commentaire"
                @click="deleteComment(comment.PostId, comment.UserId, comment.id)"
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
      </v-list-item-action>
    </v-list-item>
    <v-expand-transition>
      <div
          v-show="show"
          v-if="(comment.UserId === $store.state.user.id) || ($store.state.user.role === 'admin')"
      >
        <v-form ref="form" formenctype="multipart/form-data" v-model="updatedCommentIsValid" class="d-flex flex-column mt-6 mb-7">
          <v-text-field
              label="Votre commentaire mis à jour..."
              v-model="updatedComment"
              :rules="updatedCommentRules"
              required
              outlined
              class="mx-4 mx-md-16 px-md-3"
          ></v-text-field>
          <div class="update-comment-btn-wrapper d-flex flex-column justify-center align-center mt-1 mt-md-4">
            <v-btn
                type="submit"
                :disabled="!updatedCommentIsValid"
                @click.prevent="updateComment(comment.PostId, comment.UserId, comment.id)"
                width="300px"
                class="updated-comment-submit-btn align-center white--text"
                color="accent5"
            >
              Mettre à jour le commentaire
            </v-btn>
          </div>
        </v-form>
        <v-alert v-if="updatedCommentErrorMessage" type="error" icon="mdi-alert-circle" class="text-center font-weight-bold" color="accent"> {{ updatedCommentErrorMessage }}</v-alert>
      </div>
    </v-expand-transition>
    <v-alert v-if="updatedCommentSuccessMessage" type="success" icon="mdi-checkbox-marked-circle" class="text-center font-weight-bold" color="accent1"> {{ updatedCommentSuccessMessage }}</v-alert>
  </div>
</template>

<script>
import PostService from "@/services/post";

export default {
  name: "Comment",
  props: {
    comment: {
      type: Object
    },
    isProfilePage: {
      type: Boolean
    }
  },
  data() {
    return {
      show: false,
      updatedComment: this.comment.message,
      updatedCommentRules: [
        (v) => !!v || "Veuillez saisir un commentaire"
      ],
      updatedCommentIsValid: true,
      updatedCommentSuccessMessage: null,
      updatedCommentErrorMessage: null
    }
  },
  methods: {
    updateComment(postId, userId, commentId) {
      if (this.updatedComment) {
        PostService.updateComment(postId, commentId, {
          userId: userId,
          commentId: commentId,
          text: this.updatedComment
        }).then(response => {
          this.show = false;
          this.updatedCommentSuccessMessage = response.data.message;
          setTimeout(() => {
            this.updatedCommentSuccessMessage = "";
          }, 5000);

          const payload = {
            postId: postId,
            isProfilePage: this.isProfilePage
          };
          this.$store.dispatch("getUpdatedPost", payload);
        })
      } else {
        this.updatedCommentErrorMessage = `Veuillez écrire un commentaire`;
        setTimeout(() => {
          this.updatedCommentErrorMessage = null;
        }, 5000);
      }
    },
    deleteComment(postId, userId, commentId) {
      PostService.deleteComment(postId, commentId, {
        userId: userId,
      }).then((res) => {
        console.log(res.data.message);
        const payload = {
          postId: postId,
          isProfilePage: this.isProfilePage
        };
        this.$store.dispatch("getUpdatedPost", payload);
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
.comment-content, {
  font-size: 16px;
}
.comment-author-icon {
  width: inherit !important;
}
</style>

