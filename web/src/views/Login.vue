<template>
  <v-main class="mani-login-bg">
    <v-container fluid fill-height class="mani-login-container">
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4 lg3>
          <v-card class="elevation-2 pa-3 mani-login-v-card">
            <v-card-text>
              <div class="layout column align-center mb-8">
                <h1 class="flex my-4 secondary--text">{{$t('loginHeader')}}</h1>
              </div>
              <v-form>
                <v-text-field
                  append-icon="person"
                  name="email"
                  :label="$t('emailLabel')"
                  type="text"
                  v-model="model.email"
                  @keyup.enter="login(model)"
                ></v-text-field>
                <v-text-field
                  append-icon="lock"
                  name="password"
                  :label="$t('passwordLabel')"
                  id="password"
                  type="password"
                  v-model="model.password"
                  @keyup.enter="login(model)"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <div class="login-btn">
              <v-btn
                block
                color="primary"
                @click="login(model)"
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
import { mapGetters, mapActions } from "vuex";
import { AUTH } from "../store/types/auth.types";
export default Vue.extend({
  data: () => ({
    model: {
      email: "",
      password: ""
    }
  }),

  computed: {
    ...mapGetters({ loading: AUTH.PENDING })
  },

  methods: {
    ...mapActions({ login: AUTH.LOGIN })
  }
});
</script>
<style scoped lang="scss">
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
.v-text-field {
  margin-bottom: 8px;
}
.mani-login-v-card {
  border-radius: 10px !important;
  padding: 24px !important;
}
</style>