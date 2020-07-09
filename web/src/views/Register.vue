<template>
  <v-main class="mani-login-bg">
    <v-container fluid fill-height class="mani-login-container">
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4 lg3>
          <v-card class="elevation-2 pa-3 mani-login-v-card">
            <v-row justify="center" class="mani-login-avatar">
              <v-avatar color="white" size="100">
                <v-icon large>add</v-icon>
              </v-avatar>
            </v-row>
            <v-card-text>
              <div class="layout column align-center mb-8">
                <h1 class="flex my-4 secondary--text">{{$t('registerHeader')}}</h1>
              </div>
              <v-form>
                <v-text-field
                  append-icon="email"
                  name="email"
                  :label="$t('emailLabel')"
                  type="text"
                  v-model="model.email"
                  @keyup.enter="register(model)"
                ></v-text-field>
                <v-text-field
                  append-icon="lock"
                  name="password"
                  :label="$t('passwordLabel')"
                  id="password"
                  type="password"
                  v-model="model.password"
                  @keyup.enter="register(model)"
                ></v-text-field>
                <v-text-field
                  append-icon="lock_open"
                  name="verifyPassword"
                  :label="$t('verifyPasswordLabel')"
                  id="verifyPassword"
                  type="password"
                  v-model="model.verifyPassword"
                  @keyup.enter="register(model)"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <div class="login-btn">
              <v-btn
                block
                color="primary"
                @click="register(model)"
                :loading="loading"
              >{{$t('loginButton')}}</v-btn>
            </div>
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
      verifyPassword: ""
    }
  }),

  computed: {
    ...mapGetters({ loading: AUTH.PENDING })
  },

  methods: {
    ...mapActions({ register: AUTH.REGISTER })
  }
});
</script>
<style scoped>
</style>