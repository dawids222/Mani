<template>
  <v-main>
    <simple-yes-no-dialog
      v-model="dialog"
      :title="$t('deleteDialogTitle')"
      :message="$t('deleteAccountDialogMessage')"
      @onYesClick="deleteAccount"
    />
    <v-layout row wrap>
      <v-flex d-flex xs12 sm6 md3>
        <v-layout row wrap>
          <v-flex d-flex xs12>
            <panel class="panel">
              <account-info
                :account="get(accountId)"
                :showDeleteButton="true"
                @onDeleteClick="onDeleteClick"
              />
            </panel>
          </v-flex>
          <v-flex d-flex xs12>
            <panel class="panel">
              <account-operations />
            </panel>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 sm6 md9 fill-height>
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
import SimpleYesNoDialog from "../dialogs/SimpleYesNoDialog.vue";
import { mapGetters, mapActions } from "vuex";
import { ACCOUNTS } from "../../store/types/accounts.types";
export default Vue.extend({
  components: {
    Panel,
    Transactions,
    AccountInfo,
    AccountOperations,
    SimpleYesNoDialog,
  },
  data: () => ({
    dialog: false,
  }),
  computed: {
    ...mapGetters({ get: ACCOUNTS.GET }),
    accountId(): number {
      return Number(this.$router.currentRoute.params["id"]);
    },
  },
  methods: {
    ...mapActions({
      load: ACCOUNTS.LOAD,
      delete: ACCOUNTS.DELETE,
    }),
    onDeleteClick() {
      this.dialog = true;
    },
    deleteAccount() {
      this.delete(this.accountId);
    },
  },
  mounted() {
    if (!this.get(this.accountId)) {
      this.load(this.accountId);
    }
  },
});
</script>
<style scoped>
.v-main {
  height: 100%;
}
</style>