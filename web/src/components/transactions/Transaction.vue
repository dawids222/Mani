<template>
  <v-main>
    <simple-yes-no-dialog
      v-model="dialog"
      :title="$t('deleteDialogTitle')"
      :message="$t('deleteTransactionDialogMessage')"
      @onYesClick="deleteTransaction"
    />
    <v-layout row wrap>
      <v-flex xs12>
        <panel v-if="transaction">
          <validation-observer ref="form" v-slot="{ handleSubmit }">
            <validation-text-field
              name="name"
              rules="required|max:50"
              v-model="transaction.name"
              label="transactionNameLabel"
            />
            <validation-text-field
              name="value"
              rules="required|numeric"
              v-model="transaction.value"
              label="transactionValueLabel"
            />
            <datepicker v-model="transaction.date" :label="$t('transactionDateLabel')" />
            <v-btn
              depressed
              large
              color="primary"
              class="mani-info-panel-button"
              @click="handleSubmit(saveTransaction)"
            >{{ $t('save') }}</v-btn>
            <v-btn
              depressed
              large
              color="error"
              class="mt-5 mani-info-panel-button"
              @click="dialog=true"
            >{{ $t('delete') }}</v-btn>
          </validation-observer>
        </panel>
      </v-flex>
    </v-layout>
  </v-main>
</template>
<script lang="ts">
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import { TRANSACTIONS } from "@/store/types/transactions.types";
import Panel from "@/components/cards/Panel.vue";
import SimpleYesNoDialog from "../dialogs/SimpleYesNoDialog.vue";
import Datepicker from "@/components/input/Datepicker.vue";
import { Transaction } from "@/api/entity/transactions/transaction.entity";
import { TransactionCreate } from "@/api/entity/transactions/transaction.create.entity";
export default Vue.extend({
  components: {
    Panel,
    SimpleYesNoDialog,
    Datepicker,
  },
  data: () => ({
    dialog: false,
    transaction: null,
  }),
  computed: {
    ...mapGetters({ get: TRANSACTIONS.GET }),
    transactionId(): number {
      return Number(this.$router.currentRoute.params["id"]);
    },
  },
  methods: {
    ...mapActions({
      load: TRANSACTIONS.LOAD,
      edit: TRANSACTIONS.EDIT,
      delete: TRANSACTIONS.DELETE,
    }),
    saveTransaction() {
      this.edit(this.toSimpleTransaction(this.transaction as any));
    },
    deleteTransaction() {
      this.delete(this.transactionId);
    },
    toSimpleTransaction(transaction: Transaction): TransactionCreate {
      return {
        id: transaction.id,
        type: transaction.type,
        name: transaction.name,
        value: transaction.value,
        date: transaction.date,
        accountId: transaction.account.id,
        accountTargetId: transaction.targetAccount
          ? transaction.targetAccount.id
          : null,
        categoryId: transaction.category ? transaction.category.id : null,
      };
    },
  },
  mounted() {
    if (!this.get(this.transactionId)) {
      this.load(this.transactionId).then((_) => {
        this.transaction = this.get(this.transactionId);
      });
    } else {
      this.transaction = this.get(this.transactionId);
    }
  },
});
</script>
<style scoped>
</style>