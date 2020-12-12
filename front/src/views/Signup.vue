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
            <h1 class="text-h4 font-weight-medium flex-grow-1 text-center">Formulaire d'inscription</h1>
          </v-card-title>

          <v-card-text>
            <v-form ref="form" v-model="isValid" autocomplete="off" class="mx-8">
              <v-text-field
                  v-model="firstName"
                  label="Prénom"
                  type="text"
                  :rules="firstNameRules"
                  required
              ></v-text-field>
              <v-text-field
                  v-model="surname"
                  :rules="surnameRules"
                  label="Nom"
                  type="text"
                  required
              ></v-text-field>
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

              <div class="signup-form-btn-wrapper d-flex flex-column justify-center align-center pb-8 mt-6">
                <v-btn
                    :disabled="!isValid"
                    type="submit"
                    @click.prevent="signup"
                    rounded
                    width="180px"
                    class="signup-submit-btn align-center secondary"
                >
                  Envoyer
                </v-btn>
              </div>
            </v-form>
          </v-card-text>
          <v-alert v-if="errorMessage" type="error" icon="mdi-alert-circle" class="text-center font-weight-bold" color="accent"> {{ errorMessage }}</v-alert>
          <v-alert v-if="message" type="success" icon="mdi-checkbox-marked-circle" class="text-center font-weight-bold" color="accent1"> {{ message }} </v-alert>
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
  name: "Signup",
  data() {
    return {
      firstName: "",
      surname: "",
      email: "",
      password: "",
      errorMessage: null,
      message: null,
      isValid: true,
      firstNameRules: [
        (v) => !!v || "Veuillez saisir un prénom",
      ],
      surnameRules: [
        (v) => !!v || "Veuillez saisir un nom de famille",
      ],
      emailRules: [
        (v) => !!v || "Veuillez saisir une adresse email",
        (v) =>
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
            "Veuillez saisir une adresse email valide",
      ],
      passwordRules: [
        (v) => !!v || "Veuillez saisir un mot de passe",
        (v) =>
            v.length <= 30 ||
            "Le mot de passe doit comporter au moins 8 caractères et inclure une majuscule, une minuscule et un chiffre minimum",
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
    signup() {
      UserService.register({
        firstName: this.firstName,
        surname: this.surname,
        email: this.email,
        password: this.password
      }).then(response => {
        this.message = response.data.message;
        let router = this.$router;
        setTimeout(function () {
          router.push('/login');
        }, 3000);
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
