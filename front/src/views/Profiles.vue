<template>
  <v-container>
    <v-row>
      <v-col cols="12" offset-md="2" md="8">
        <v-card class="profile-card mt-5 mb-16">
          <v-container fluid>
            <v-row>
              <v-col cols="12">
                <v-card-title class="py-0 justify-center">
                  <h1 class="text-h5 text-center font-weight-medium">Annuaire des profils</h1>
                </v-card-title>

                <div
                    v-if="users.length > 0"
                    class="profiles-wrapper mt-7 px-4 px-md-15"
                >
                  <v-row>
                    <ProfileListItem
                        v-for="user in users"
                        :key="user.id"
                        :user="user"
                    >
                    </ProfileListItem>
                  </v-row>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ProfileListItem from "@/components/ProfileListItem";
import UserService from "@/services/user";

export default {
  name: "Profiles",
  components: {
    ProfileListItem
  },
  data() {
    return {
      // user
      users: [],
    }
  },
  created() {
    UserService.getAllUsers().then(response => {
      this.users = response.data;
    });
  },
}
</script>

<style scoped>

</style>
