<template>
  <v-col cols="12" md="6" class="mb-2 mb-md-4">
    <v-list-item>
      <v-btn
          :to="`/profil/${user.id}`"
          aria-label="Page profil de l'utilisateur"
          icon
          class="mr-4"
      >
        <span class="user-photo profile-avatar v-avatar mr-4 accent2" style="height: 65px; min-width: 65px; width: 65px;">
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
              size="30px"
          >
            mdi-account-circle
          </v-icon>
        </span>
      </v-btn>

      <v-list-item-content>
        <v-list-item-title class="user-name">
          <router-link :to="{name: 'Profile', params: { id: user.id }}" aria-label="Page de profil de l'utilisateur">
            {{ userReverseFullName }}
          </router-link>
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
