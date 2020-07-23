<template>
  <v-main>
    <v-layout row wrap>
      <v-flex d-flex xs12 sm6 md5>
        <v-layout row wrap>
          <v-flex d-flex xs12>
            <panel class="panel">
              <account-info :account="account" />
            </panel>
          </v-flex>
          <v-flex d-flex xs12>
            <panel class="panel">
              <account-operations />
            </panel>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 sm6 md7 fill-height>
        <panel class="panel">
          <transactions :accountId="accountId" />
        </panel>
      </v-flex>
    </v-layout>
  </v-main>
</template>
<script lang="ts">
import Vue from "vue";
import Panel from "@/components/cards/Panel.vue";
import Transactions from "@/components/transactions/Transactions.vue";
import AccountInfo from "@/components/accounts/Account.info.vue";
import AccountOperations from "@/components/accounts/Account.operations.vue";
import { mapGetters } from "vuex";
import { ACCOUNTS } from "../../store/types/accounts.types";
export default Vue.extend({
  components: {
    Panel,
    Transactions,
    AccountInfo,
    AccountOperations,
  },
  data: () => ({
    account: null,
  }),
  computed: {
    ...mapGetters({ get: ACCOUNTS.GET }),
    accountId(): number {
      return Number(this.$router.currentRoute.params["id"]);
    },
  },
  mounted() {
    this.account = this.get(this.accountId);
  },
});
</script>
<style scoped>
.v-main {
  height: 100%;
}
</style>