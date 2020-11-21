<template>
  <v-container>
    <v-row>
      <v-col cols="12" offset-md="2" md="8">
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

export default {
  name: "Posts",
  components: {
    Post
  },
  data() {
    return {
      errorMessage: null,
    }
  },
  computed: {
    posts() {
      return this.$store.getters.posts;
    }
  },
  beforeMount() {
    this.$store.dispatch("getPosts")
    .catch(error => {
      this.errorMessage = error.response.data.error;
    })
  }
}
</script>

<style scoped>

</style>
