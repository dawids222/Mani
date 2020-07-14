<template>
  <v-container>
    <v-layout row wrap>
      <v-flex v-for="(account, index) in accounts" :key="index" xs12 sm6 lg4 xl3>
        <entity-card
          :avatar="account.avatar"
          :color="account.color"
          :title="account.name"
          :subtitle="account.balance"
          :text="account.description"
          @click="onAccountClick(account)"
        />
      </v-flex>
      <v-flex xs12 sm6 lg4 xl3>
        <blank-entity-card @click="onAddAccountClick" />
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import EntityCard from "@/components/cards/EntityCard.vue";
import BlankEntityCard from "@/components/cards/BlankEntityCard.vue";
import { ACCOUNTS } from "@/store/types/accounts.types";
import { mapGetters, mapActions } from "vuex";
export default Vue.extend({
  components: {
    EntityCard,
    BlankEntityCard
  },
  computed: {
    ...mapGetters({
      loading: ACCOUNTS.PENDING,
      accounts: ACCOUNTS.ACCOUNTS
    })
  },
  methods: {
    ...mapActions({
      loadAccounts: ACCOUNTS.GET_ALL
    }),
    onAccountClick(account: any) {
      this.$router.push({ name: "Account", params: { id: account.id } });
    },
    onAddAccountClick() {
      return;
    }
  },
  mounted() {
    this.loadAccounts();
  }
});
</script>
<style scoped>
.container {
  margin-top: 20px;
}
</style>