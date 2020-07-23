<template>
  <v-layout row wrap>
    <v-flex xs3></v-flex>
    <v-flex xs6>
      <account-info :account="account" @onSaveClick="onSaveClick" />
    </v-flex>
    <v-flex xs3></v-flex>
  </v-layout>
</template>
<script lang="ts">
import Vue from "vue";
import AccountInfo from "@/components/accounts/Account.info.vue";
import { mapActions, mapGetters } from "vuex";
import { ACCOUNTS } from "../../store/types/accounts.types";
export default Vue.extend({
  components: {
    AccountInfo,
  },
  data: () => ({
    account: {
      id: null,
      name: "",
      description: "",
      balance: 0,
      logo: "add",
      color: "#000000",
    },
  }),
  methods: {
    ...mapActions({ create: ACCOUNTS.CREATE }),
    onSaveClick() {
      // todo: validate
      this.create(this.account);
    },
  },
});
</script>
<style scoped>
</style>