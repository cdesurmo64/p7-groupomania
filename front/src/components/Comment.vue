<template>
  <div class="comment">
    <v-list-item class="ml-5">
      <v-btn
          :to="`/profil/${comment.UserId}`"
          aria-label="Page de profil de l'auteur du commentaire"
          icon
          class="mr-4"
      >
        <span class="v-avatar comment-photo profile-avatar mr-4 accent2" style="height: 55px; min-width: 55px; width: 55px;">
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
              size="30px"
          >
            mdi-account-circle
          </v-icon>
        </span>
      </v-btn>

      <v-list-item-content>
        <v-list-item-title class="font-weight-medium">
          <router-link :to="{name: 'Profile', params: { id: comment.UserId }}" aria-label="Page de profil de l'auteur du commentaire">
            {{ authorFullName }}
          </router-link>
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
        <div class="comment-action-btn-wrapper d-flex flex-column flex-md-row justify-center align-center mt-5">
          <v-hover
              v-slot="{ hover }">
            <v-btn
                type="button"
                title="Éditer le commentaire"
                @click="showEditComment = !showEditComment"
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
                @click="showDeleteComment = !showDeleteComment"
                rounded
                icon
                class="align-center ml-md-2 mt-2 mt-md-0"
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
          v-show="showEditComment"
          v-if="(comment.UserId === $store.state.user.id) || ($store.state.user.role === 'admin')"
      >
        <v-form ref="form" enctype="multipart/form-data" v-model="updatedCommentIsValid" class="d-flex flex-column mt-6 mb-7">
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

    <v-expand-transition>
      <div v-show="showDeleteComment"
           v-if="(comment.UserId === $store.state.user.id) || ($store.state.user.role === 'admin')"
           class="mt-5 mx-5 mx-md-8"
      >
        <v-alert icon="mdi-head-question-outline" outlined class="delete-alert text-center font-weight-bold" color="secondary">
          <p class="ml-n6 ml-md-n6">Êtes-vous sûr(e) de vouloir supprimer ce commentaire ?</p>
          <div class="delete-btn-wrapper d-flex justify-center align-content-space-between">
            <v-btn
                type="button"
                @click="deleteComment(comment.PostId, comment.UserId, comment.id)"
                aria-label="Confirmer la suppression"
                rounded
                width="20px"
                class="align-center secondary ml-n9 ml-md-n10"
            >
              OUI
            </v-btn>
            <v-btn
                type="button"
                @click="showDeleteComment = !showDeleteComment"
                aria-label="Annuler la suppression"
                rounded
                width="20px"
                class="align-center primary ml-4 ml-md-6"
            >
              NON
            </v-btn>
          </div>
        </v-alert>
      </div>
    </v-expand-transition>
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
      showEditComment: false,
      showDeleteComment: false,
      updatedComment: this.comment.message,
      updatedCommentRules: [
        (v) => !!v || "Veuillez saisir un commentaire"
      ],
      updatedCommentIsValid: true,
      updatedCommentSuccessMessage: null,
      updatedCommentErrorMessage: null
    }
  },
  computed: {
    authorFullName() {
      return `${this.comment.User.firstName} ${this.comment.User.surname}`
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
          this.showEditComment = false;
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
  overflow: hidden;
}
.comment-author-icon {
  width: inherit !important;
}
</style>

