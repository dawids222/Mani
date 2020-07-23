<template>
  <v-main>
    <v-row>
      <v-col></v-col>
      <v-col>
        <datepicker v-model="model.from" :label="$t('fromLabel')" />
      </v-col>
      <v-col></v-col>
      <v-col>
        <datepicker v-model="model.to" :label="$t('toLabel')" />
      </v-col>
      <v-col></v-col>
    </v-row>
    <v-layout row wrap>
      <v-flex v-for="(transaction, index) in transactions(query)" :key="index" xs12 sm6 lg4 xl3>
        <transaction-item :transaction="transaction" />
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
export default Vue.extend({
  components: {
    Datepicker,
    TransactionItem,
  },
  props: {
    categoryId: { type: Number, default: undefined },
    accountId: { type: Number, default: undefined },
    targetAccountId: { type: Number, default: undefined },
  },
  data: () => ({
    model: {
      from: "",
      to: "",
      page: 1,
      itemsPerPage: 10,
    },
  }),
  computed: {
    ...mapGetters({ transactions: TRANSACTIONS.TRANSACTIONS }),
    query(): any {
      return {
        ...this.model,
        ...this.$props,
      };
    },
  },
  methods: {
    ...mapActions({ load: TRANSACTIONS.GET_ALL }),
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