<template>
  <v-main class="mani-login-bg">
    <v-container fluid fill-height class="mani-login-container">
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4 lg3>
          <v-card class="elevation-2 pa-3 mani-login-v-card">
            <validation-observer ref="form" v-slot="{ handleSubmit }">
              <v-row justify="center" class="mani-login-avatar">
                <v-avatar color="white" size="100">
                  <v-icon large>add</v-icon>
                </v-avatar>
              </v-row>
              <v-card-text>
                <div class="layout column align-center mb-8">
                  <h1 class="flex my-4 secondary--text">{{$t('registerHeader')}}</h1>
                </div>
                <validation-text-field
                  name="email"
                  rules="required|email"
                  v-model="model.email"
                  label="emailLabel"
                  icon="email"
                  :outlined="false"
                  @keyup.enter="handleSubmit(submit)"
                />
                <validation-text-field
                  name="password"
                  rules="required|min:4|max:20|noWhiteSpaces|restricted"
                  v-model="model.password"
                  label="passwordLabel"
                  icon="lock"
                  :outlined="false"
                  type="password"
                  @keyup.enter="handleSubmit(submit)"
                />
                <validation-text-field
                  name="verifyPassword"
                  rules="required|confirmed:password"
                  v-model="model.verifyPassword"
                  label="verifyPasswordLabel"
                  icon="lock_open"
                  :outlined="false"
                  @keyup.enter="handleSubmit(submit)"
                />
              </v-card-text>
              <div class="login-btn">
                <v-btn
                  block
                  color="primary"
                  @click="handleSubmit(submit)"
                  :loading="loading"
                >{{$t('loginButton')}}</v-btn>
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
import { AUTH } from "@/store/types/auth.types";
import { mapGetters, mapActions } from "vuex";
export default Vue.extend({
  data: () => ({
    model: {
      email: "",
      password: "",
      verifyPassword: "",
    },
  }),

  computed: {
    ...mapGetters({ loading: AUTH.PENDING }),
  },

  methods: {
    ...mapActions({ register: AUTH.REGISTER }),
    submit() {
      this.register(this.model);
    },
  },
});
</script>
<style scoped>
</style>