<template>
  <v-main class="mani-login-bg">
    <v-container fluid fill-height class="mani-login-container">
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4 lg3>
          <v-card class="elevation-2 pa-3 mani-login-v-card">
            <validation-observer ref="form" v-slot="{ handleSubmit }">
              <v-row justify="center" class="mani-login-avatar">
                <v-avatar color="white" size="100">
                  <v-icon large>person</v-icon>
                </v-avatar>
              </v-row>
              <v-card-text>
                <div class="layout column align-center mb-8">
                  <h1 class="flex my-4 secondary--text">{{$t('loginHeader')}}</h1>
                </div>
                <v-form>
                  <validation-text-field
                    name="email"
                    rules="required|email"
                    :outlined="false"
                    icon="email"
                    label="emailLabel"
                    v-model="model.email"
                    @keyup.enter="handleSubmit(submit)"
                  />
                  <validation-text-field
                    name="password"
                    rules="required|min:4|max:20|noWhiteSpaces|restricted"
                    :outlined="false"
                    icon="lock"
                    label="passwordLabel"
                    v-model="model.password"
                    type="password"
                    @keyup.enter="handleSubmit(submit)"
                  />
                </v-form>
              </v-card-text>
              <div class="login-btn">
                <v-btn
                  block
                  color="primary"
                  @click="handleSubmit(submit)"
                  :loading="loading"
                >{{$t('loginButton')}}</v-btn>
              </div>
              <div class="mani-login-sign-up-section">
                <div class="mani-login-sign-up-label">{{$t('dontHaveAnAccount')}}</div>&nbsp;
                <div class="mani-login-sign-up-label" @click="signUp">{{$t('signUp')}}</div>
              </div>
            </validation-observer>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-main>
</template>
<script lang="ts">
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import { AUTH } from "../store/types/auth.types";
export default Vue.extend({
  data: () => ({
    model: {
      email: "",
      password: "",
    },
  }),

  computed: {
    ...mapGetters({ loading: AUTH.PENDING }),
  },

  methods: {
    ...mapActions({ login: AUTH.LOGIN, signUp: AUTH.SIGN_UP }),
    submit() {
      this.login(this.model);
    },
  },
});
</script>
<style>
.mani-login-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50%;
  background-color: var(--v-primary-base);
}
.mani-login-container {
  transform: translateY(50%);
}
.mani-login-avatar {
  transform: translateY(-50%);
  margin-bottom: -50px;
}
.mani-login-sign-up-section {
  margin-top: 8px;
}
.mani-login-sign-up-label {
  display: inline;
}
.mani-login-sign-up-label + .mani-login-sign-up-label {
  cursor: pointer;
  color: var(--v-primary-base);
}
.mani-login-sign-up-label + .mani-login-sign-up-label:hover {
  cursor: pointer;
  color: var(--v-accent-base);
}
.v-text-field {
  margin-bottom: 8px;
}
.mani-login-v-card {
  border-radius: 10px !important;
  padding: 0px 24px 24px 24px !important;
}
</style>