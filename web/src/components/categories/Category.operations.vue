<template>
  <v-container>
    <transaction-create-dialog
      v-if="dialog"
      v-model="dialog"
      :type="type"
      :accountId="accountId"
      :categoryId="id"
    />
    <v-layout row wrap>
      <v-flex xs12>
        <v-btn bottom depressed large color="error" @click="expense">{{ $t('accountExpenseLabel') }}</v-btn>
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
  }),
  methods: {
    expense() {
      this.reset();
      this.type = TransactionType.EXPENSE;
      this.dialog = true;
    },
    reset() {
      this.dialog = false;
      this.type = 0;
      this.accountId = null;
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