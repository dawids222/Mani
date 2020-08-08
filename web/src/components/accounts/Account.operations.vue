<template>
  <v-container>
    <transaction-create-dialog
      v-if="dialog"
      v-model="dialog"
      :type="type"
      :accountId="accountId"
      :accountTargetId="accountTargetId"
    />
    <v-layout row wrap>
      <v-flex xs12>
        <v-btn
          bottom
          depressed
          large
          color="primary"
          @click="transfer"
        >{{ $t('accountTransferLabel') }}</v-btn>
      </v-flex>
      <v-flex xs12>
        <!-- <v-btn bottom depressed large color="error" @click="expense">{{ $t('accountExpenseLabel') }}</v-btn> -->
      </v-flex>
      <v-flex xs12>
        <v-btn bottom depressed large color="success" @click="income">{{ $t('accountIncomeLabel') }}</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
import { TransactionType } from "@/api/entity/enum/transaction.type";
import TransactionCreateDialog from "@/components/dialogs/Transaction.create.dialog.vue";
export default Vue.extend({
  components: {
    TransactionCreateDialog,
  },
  props: {
    id: Number,
  },
  data: () => ({
    dialog: false,
    type: 0,
    accountId: null,
    accountTargetId: null,
  }),
  methods: {
    transfer() {
      this.reset();
      this.type = TransactionType.TRANSFER;
      this.accountTargetId = this.id;
      this.dialog = true;
    },
    expense() {
      this.reset();
      this.type = TransactionType.EXPENSE;
      this.accountId = this.id;
      this.dialog = true;
    },
    income() {
      this.reset();
      this.type = TransactionType.INCOME;
      this.accountId = this.id;
      this.dialog = true;
    },
    reset() {
      this.dialog = false;
      this.type = 0;
      this.accountId = null;
      this.accountTargetId = null;
    },
  },
});
</script>
<style scoped>
.container {
  height: 100%;
}
.v-btn {
  width: 100%;
  margin: 10px 0px;
  height: 25%;
}
</style>