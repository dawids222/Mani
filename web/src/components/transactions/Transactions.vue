<template>
  <v-main>
    <transaction-create-dialog
      v-if="dialog"
      v-model="dialog"
      :transactionId="selected.id"
      :name="selected.name"
      :date="selected.date"
      :balance="selected.balance"
      :type="selected.type"
      :accountId="selected.accountId"
      :accountTargetId="selected.accountTargetId"
      :categoryId="selected.categoryId"
      :editMode="true"
    />
    <v-row>
      <v-col></v-col>
      <v-col>
        <datepicker v-model="model.from" :label="$t('fromLabel')" />
      </v-col>
      <v-col></v-col>
      <v-col>
        <datepicker v-model="model.to" :label="$t('toLabel')" />
      </v-col>
      <v-col>{{$t('transactionBalanceLabel')}}: {{balance}} {{currency}}</v-col>
      <v-col></v-col>
    </v-row>
    <v-layout row wrap>
      <v-flex v-for="(transaction, index) in transactions(query)" :key="index" xs12 sm6 lg4 xl3>
        <transaction-item :transaction="transaction" @click="onTransactionClick(transaction)" />
      </v-flex>
    </v-layout>
  </v-main>
</template>
<script lang="ts">
import Vue from "vue";
import Datepicker from "@/components/input/Datepicker.vue";
import { mapGetters, mapActions } from "vuex";
import { TRANSACTIONS } from "../../store/types/transactions.types";
import TransactionItem from "@/components/transactions/Transaction.item.vue";
import { SETTINGS } from "@/store/types/settings.types";
import { Transaction } from "@/api/entity/transactions/transaction.entity";
import TransactionCreateDialog from "@/components/dialogs/Transaction.create.dialog.vue";
import { TransactionNormalized } from "@/api/entity/transactions/transaction.normalized.entity";
import { TransactionType } from "@/api/entity/enum/transaction.type";
export default Vue.extend({
  components: {
    Datepicker,
    TransactionItem,
    TransactionCreateDialog,
  },
  props: {
    categoryId: { type: Number, default: undefined },
    accountId: { type: Number, default: undefined },
    targetAccountId: { type: Number, default: undefined },
  },
  data: () => ({
    dialog: false,
    model: {
      from: "",
      to: "",
      page: 1,
      itemsPerPage: 10,
    },
    selected: {
      id: 0,
      type: 0,
      balance: 0,
      accountId: 0,
      name: "",
      date: "",
      accountTargetId: 0 as any,
      categoryId: 0 as any,
    },
  }),
  computed: {
    ...mapGetters({
      transactions: TRANSACTIONS.TRANSACTIONS,
      currency: SETTINGS.CURRENCY,
    }),
    query(): any {
      return {
        ...this.model,
        ...this.$props,
      };
    },
    balance(): number {
      let sum = 0;
      this.transactions(this.query).forEach((x: TransactionNormalized) => {
        if (x.type !== TransactionType.TRANSFER) {
          sum += x.value;
        }
      });
      return sum;
    },
  },
  methods: {
    ...mapActions({ load: TRANSACTIONS.LOAD_ALL }),
    initializeDates() {
      const date = new Date(),
        y = date.getFullYear(),
        m = date.getMonth();
      const firstDay = new Date(y, m, 1);
      const lastDay = new Date(y, m + 1, 0);
      const year = firstDay.getUTCFullYear();
      const month = (firstDay.getMonth() + 1).toString().padStart(2, "0");
      const startDay = firstDay.getDate().toString().padStart(2, "0");
      const endDay = lastDay.getDate().toString().padStart(2, "0");
      this.model.from = `${year}-${month}-${startDay}`;
      this.model.to = `${year}-${month}-${endDay}`;
    },
    onTransactionClick(transaction: Transaction) {
      this.selected.id = transaction.id;
      this.selected.name = transaction.name;
      this.selected.date = transaction.date;
      this.selected.balance = transaction.value;
      this.selected.type = transaction.type;
      this.selected.accountId = transaction.account.id;
      this.selected.accountTargetId = transaction.targetAccount
        ? transaction.targetAccount.id
        : null;
      this.selected.categoryId = transaction.category
        ? transaction.category.id
        : null;
      this.dialog = true;
    },
  },
  mounted() {
    this.initializeDates();
    this.load(this.query);
  },
  watch: {
    model: {
      deep: true,
      handler() {
        this.load(this.query);
      },
    },
  },
});
</script>
<style scoped>
.th {
  display: none !important;
}
</style>