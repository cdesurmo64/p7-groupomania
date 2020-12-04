<template>
  <v-container>
    <v-row>
      <v-col cols="12" offset-md="2" md="8">
        <v-card class="post-card my-md-2">
          <v-card-title class="pt-8 pb-md-6 justify-md-center text-center">
            <h1>Bienvenue sur votre feed</h1>
          </v-card-title>
          <v-card-text class="mx-auto px-md-12 mt-4 pb-0">
            <p class="feed-description text-subtitle-1 text-md-h6 font-weight-regular black--text text-center">
              Sur cette page vous pouvez...
              <br>découvrir les posts de vos collègues, y réagir...
              <br>et ajouter vos propres posts !
            </p>
          </v-card-text>
          <v-card-actions class="actions-btn-wrapper d-flex justify-space-around pt-0">
            <loading :active.sync="isLoading"
                     :can-cancel="true"
                     :on-cancel="onCancel"
                     :is-full-page="fullPage"></loading>
            <div class="refresh-feed">
              <v-btn
                  @click="refreshFeed"
                  class="ma-2"
                  aria-label="Rafraichir le feed"
                  text
                  icon
                  color="accent4"
              >
                <div class="pr-1">
                  Rafraichir le feed
                </div>
                <v-icon medium>
                  mdi-refresh-circle
                </v-icon>
              </v-btn>
            </div>
          </v-card-actions>
        </v-card>

        <v-card class="post-card my-5">
          <v-card-title class="pt-8 pb-md-6 justify-md-center text-center">
            <h2>Partagez quelque chose avec vos collègues</h2>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="isValid" formenctype="multipart/form-data" autocomplete="off">
              <v-textarea
                  label="Ecrivez..."
                  v-model="newPost.text"
                  :rules="newPostRules"
                  required
                  outlined
                  class="pt-8 pt-md-4 mx-4 mx-md-10"
              ></v-textarea>
              <div class="d-flex flex-column flex-md-row justify-center align-center mt-4 mt-md-2">
                <label for="newPostImage" class="pr-2 black--text">Si le souhaitez, sélectionnez une image à poster :</label>
                <input
                    @change="uploadImage"
                    id="newPostImage"
                    type="file"
                    accept="image/png, image/jpeg"
                    ref="file"
                    name="image"
                />
              </div>
              <div class="post-form-btn-wrapper d-flex flex-column justify-center align-center pb-4 pb-md-4 mt-12">
                <v-btn
                    :disabled="!isValid"
                    type="submit"
                    @click.prevent="submitPost"
                    rounded
                    width="180px"
                    class="post-submit-btn align-center secondary mr-md-5"
                >
                  Poster
                </v-btn>
              </div>
            </v-form>
          </v-card-text>
          <v-alert v-if="newPostSuccessMessage" type="success" icon="mdi-checkbox-marked-circle" class="text-center font-weight-bold" color="accent1"> {{ newPostSuccessMessage }}</v-alert>
        </v-card>

        <Post
            v-for="post in posts"
            :key="post.id"
            :post="post"
            :id="post.id"
        >
        </Post>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Post from "../components/Post.vue";
import PostService from "../services/post";
import Loading from 'vue-loading-overlay'; // Imports loading component
import 'vue-loading-overlay/dist/vue-loading.css'; // Imports loading component stylesheet


export default {
  name: "Posts",
  components: {
    Post,
    Loading
  },
  data() {
    return {
      isLoading: false,
      fullPage: true,
      isValid: true,
      newPostSuccessMessage: null,
      newPostRules: [
        (v) => !!v || "Veuillez écrire quelque chose"
      ],
      newPost: {
        text: "",
        imageFile: ""
      },
    }
  },
  computed: {
    posts() {
      return this.$store.getters.posts;
    },
    user() {
      return this.$store.getters.getUser;
    }
  },
  beforeMount() {
    this.$store.dispatch("getPosts")
  },
  methods: {
    uploadImage() {
      this.newPost.imageFile = this.$refs.file.files[0];
    },
    refreshFeed() {
      this.isLoading = true;
      this.$store.dispatch("getPosts");
      setTimeout(() => {
        this.isLoading = false
      },1000)
    },
    onCancel() {
      console.log('User cancelled the loader.')
    },
    submitPost() {
      const formData = new FormData();
      formData.append("text", this.newPost.text);
      if (this.newPost.imageFile) {
        formData.append("image", this.newPost.imageFile)
      }

      PostService.createAPost(formData).then(response => {
        this.newPost.text = "";
        this.newPost.imageFile = "";
        this.newPostSuccessMessage = response.data.message;
        setTimeout(() => {
          this.newPostSuccessMessage = "";
        }, 5000);

        this.$store.dispatch("getPosts");
      })
    }
  }
}
</script>

<style scoped>

</style>
