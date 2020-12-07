<template>
  <v-col cols="12" md="6" class="mb-2 mb-md-4">
    <v-list-item>
      <v-btn
          :to="`/profil/${user.id}`"
          icon
          class="mr-4"
      >
        <v-list-item-avatar class="user-photo mr-4" color="accent2" size="65px">
          <img
              v-if="user.photo"
              :src="user.photo"
              alt="Photo de profil de l'utilisateur"
          />
          <v-icon
              v-else
              color="white"
              aria-label="Icone du profil de l'utilisateur"
              class="user-icon"
              role="img"
              aria-hidden="false"
              size="24px"
          >
            mdi-account-circle
          </v-icon>
        </v-list-item-avatar>
      </v-btn>

      <v-list-item-content>
        <v-list-item-title class="user-name">
          <a :href="`/profil/${user.id}`">
            {{ userReverseFullName }}
          </a>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-col>
</template>

<script>
export default {
  name: "ProfileListItem",
  props: {
    user: {
      type: Object
    }
  },
  computed: {
    userReverseFullName() {
      return `${this.user.surname} ${this.user.firstName}`
    },
  }
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;

  &:link, &:visited, &:hover, &:active {
    color: black;
  }
}
.user-icon {
  width: inherit !important;
}
.user-name {
  font-size: 20px;
}
</style>
