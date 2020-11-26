<template>
  <v-container>
    <v-row>
      <v-col cols="12" offset-md="2" md="8">

        <v-card class="post-card my-5">
          <v-card-title class="py-0">
            <h2>Partagez quelque chose avec vos collègues</h2>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="isValid" autocomplete="off">

              <v-textarea
                  label="Ecrivez..."
                  v-model="newPost.text"
                  :rules="newPostRules"
                  required
                  outlined
                  class="pt-8 pt-md-4 mx-4 mx-md-10"
              ></v-textarea>

              <div class="d-flex  justify-center ">
                <label for="newPostImage" class="pr-2 black--text">Si le souhaitez, sélectionnez une image à poster :</label>
                <input
                    @change="uploadImage"
                    formenctype="multipart/form-data"
                    id="newPostImage"
                    type="file"
                    accept="image/png, image/jpeg"
                    ref="file"
                    name="Uploader une image"
                />
              </div>

              <div class="post-form-btn-wrapper d-flex flex-column justify-center align-center pb-8 mt-5 mt-md-8">
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
          <v-alert v-if="newPostErrorMessage" type="error" icon="mdi-alert-circle" class="text-center font-weight-bold" color="accent"> {{ newPostErrorMessage }}</v-alert>
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


export default {
  name: "Posts",
  components: {
    Post
  },
  data() {
    return {
      isValid: true,
      errorMessage: null,
      newPostErrorMessage: null,
      newPostSuccessMessage: null,
      newPostRules: [
        (v) => !!v || "Veuillez écrire quelque chose"
      ],
      newPost: {
        text: "",
        imageFile: "",
        id: ""
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
    .catch(error => {
      this.errorMessage = error.response.data.error;
    })
  },
  methods: {
    uploadImage() {
      this.newPost.imageFile = this.$refs.file.files[0];
    },
    submitPost() {
      const formData = new FormData();
      formData.append("text", this.newPost.text);
      if (this.newPost.imageFile) {
        formData.append("image", this.newPost.imageFile)
      }

      PostService.createAPost(formData)
          .then(response => {
            this.newPost.text = "";
            this.newPost.imageFile = "";
            this.newPostSuccessMessage = response.data.message;
            this.newPost.id = response.data.newPost.id;
            setTimeout(() => {
              this.newPostSuccessMessage = "";
            }, 5000);

            this.$store.dispatch("getPosts")
                .catch(error => {
                  this.postsErrorMessage = error.response.data.error;
                })
          }).catch(error => {
        this.newPostErrorMessage = error.response.data.error;
        setTimeout(() => {
          this.newPostErrorMessage = "";
        }, 10000);
      })
    }
  }
}
</script>

<style scoped>

</style>
