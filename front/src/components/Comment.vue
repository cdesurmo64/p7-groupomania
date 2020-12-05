<template>
  <div class="comment">
    <v-list-item class="ml-3">
      <v-btn
          :to="`/profil/${comment.UserId}`"
          icon
          class="mr-4"
      >
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
        <div class="comment-action-btn-wrapper d-flex flex-column justify-center align-center mt-3">
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
    <v-alert v-if="updateCommentSuccessMessage" type="success" icon="mdi-checkbox-marked-circle" class="text-center font-weight-bold" color="accent1"> {{ updateCommentSuccessMessage }}</v-alert>

  </div>
</template>

<script>
import PostService from "@/services/post";

export default {
  name: "Comment",
  props: {
    comment: {
      type: Object
    }
  },
  data() {
    return {
      show: false,
      updatedComment: null,
      updatedCommentRules: [
        (v) => !!v || "Veuillez saisir un commentaire"
      ],
      updatedCommentIsValid: true,
      updateCommentSuccessMessage: null,
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
          this.updatedComment = null;
          this.show = false;
          this.updateCommentSuccessMessage = response.data.message;
          setTimeout(() => {
            this.updateCommentSuccessMessage = "";
          }, 5000);

          this.$store.dispatch("getUpdatedPost", postId)
        })
      } else {
        this.updatedCommentErrorMessage = `Veuillez écrire un commentaire`;
        setTimeout(() => {
          this.updatedCommentErrorMessage = null;
        }, 5000);
      }
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
