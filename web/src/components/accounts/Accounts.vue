<template>
  <v-container>
    <v-layout row wrap>
      <v-flex v-for="(account, index) in accounts" :key="index" xs12 sm6 lg4>
        <entity-card
          :avatar="account.avatar"
          :color="account.color"
          :title="account.name"
          :subtitle="account.balance"
          :text="account.description"
          @click="onAccountClick(account)"
        />
      </v-flex>
      <v-flex xs12 sm6 lg4>
        <blank-entity-card @click="onAddAccountClick" />
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import EntityCard from "@/components/cards/EntityCard.vue";
import BlankEntityCard from "@/components/cards/BlankEntityCard.vue";
export default Vue.extend({
  components: {
    EntityCard,
    BlankEntityCard
  },
  data: () => ({
    accounts: []
  }),
  mounted() {
    for (let i = 0; i < 5; i++) {
      this.accounts.push({
        id: i,
        avatar: "attach_money",
        color: "primary",
        name: "Nest konto",
        balance: "8896 zł",
        description: "coś tam, nie wiem..."
      });
    }
  },
  methods: {
    onAccountClick(account: any) {
      this.$router.push({ name: "Account", params: { id: account.id } });
    },
    onAddAccountClick() {
      return;
    }
  }
});
</script>
<style scoped>
.container {
  margin-top: 20px;
}
</style>