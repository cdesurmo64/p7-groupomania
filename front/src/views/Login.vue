<template>
  <v-container>
    <v-row>
      <v-col cols="12" offset-md="3" md="6">
        <router-link to="/" title="Page d'accueil">
          <v-img
              :src="require('../assets/logo-name-white-left.svg')"
              contain
              width="100%"
              alt="Logo de Groupomania"
              class="mb-4"
          />
        </router-link>

        <v-card class="white">
          <v-card-title class="pt-8 mb-5">
            <h1 class="text-h4 font-weight-medium flex-grow-1 text-center">Formulaire de connexion</h1>
          </v-card-title>

          <v-card-text>
            <v-form ref="form" v-model="isValid" autocomplete="off" class="mx-8">
              <v-text-field
                  label="Email"
                  v-model="email"
                  type="email"
                  :rules="emailRules"
                  required
              ></v-text-field>
              <v-text-field
                  label="Mot de passe"
                  v-model="password"
                  type="password"
                  :rules="passwordRules"
                  required
                  class="input-group--focused"
              ></v-text-field>

              <div class="login-form-btn-wrapper d-flex flex-column justify-center align-center pb-8 mt-6">
                <v-btn
                    :disabled="!isValid"
                    type="submit"
                    @click.prevent="login"
                    rounded
                    width="180px"
                    class="login-submit-btn align-center secondary"
                >
                  Envoyer
                </v-btn>
              </div>
            </v-form>
          </v-card-text>
          <v-alert v-if="loginSuccessMessage" type="success" icon="mdi-checkbox-marked-circle" class="text-center font-weight-bold" color="accent1"> {{ loginSuccessMessage }} </v-alert>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import router from '../router'
import store from "@/store";
import UserService from "../services/user.js";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      loginSuccessMessage: null,
      isValid: true,
      emailRules: [
        (v) => !!v || "Veuillez saisir une adresse email",
        (v) =>
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
            "Veuillez saisir une adresse email valide"
      ],
      passwordRules: [
        (v) => !!v || "Veuillez saisir un mot de passe",
        (v) => (v && v.length >= 8) || "Le mot de passe doit comporter au moins 8 caractères",
        (v) => /(?=.*[A-Z])/.test(v) || "Le mot de passe doit inclure au moins une majuscule",
        (v) => /(?=.*[a-z])/.test(v) || "Le mot de passe doit inclure au moins une minuscule",
        (v) => /(?=.*\d)/.test(v) || "Le mot de passe doit inclure au moins un chiffre",
      ],
    };
  },
  beforeCreate() {
    const isLoggedIn = store.getters.isLoggedIn;
    if (isLoggedIn) {
      router.push("/posts");
    }
  },
  methods: {
    login() {
      UserService.logIn({
        email: this.email,
        password: this.password
      }).then(response => {
        this.$cookies.set('token', response.data.token, 60 * 60 * 12);
        this.loginSuccessMessage = response.data.message;
        this.$store.dispatch('setUser', response.data.user);

        setTimeout(() => {
          this.loginSuccessMessage = null;
          this.$store.dispatch('logInUser', response.data.user);
          this.$router.push('/posts');
        }, 1500);

      }).catch(() => {
          this.email = "";
          this.password = "";
      })
    }
  }
}
</script>

<style lang="scss">
.v-card__text, .v-card__title {
  word-break: normal;
}
</style>
