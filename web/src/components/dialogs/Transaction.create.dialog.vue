<template>
  <v-dialog :value="value" max-width="500" max-height="700" @input="$emit('input', $event)">
    <v-card>
      <v-card-actions />
      <v-card-text v-if="tab === 0">
        <v-layout row wrap class="mb-5">
          <v-flex>
            <transaction-target v-model="account" @click="tab = 1" />
          </v-flex>
          <v-flex xs6 v-if="isExpense">
            <transaction-target v-model="category" :circle="true" />
          </v-flex>
          <v-flex xs6 v-if="isTransfer">
            <transaction-target v-model="accountTarget" :circle="false" />
          </v-flex>
        </v-layout>
        <v-text-field v-model="name" :label="$t('transactionNameLabel')" outlined></v-text-field>
        <datepicker v-model="date" :label="$t('date')" />
        <numpad v-model="balance" @submit="submit" />
      </v-card-text>
      <v-card-text v-if="tab === 1">
        <v-layout row wrap>
          <v-flex xs4 v-for="(acc, index) in accounts" :key="index">
            <entity-card-compact :entity="acc" :circle="false" @click="tab = 0; account = acc" />
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import Vue from "vue";
import Numpad from "@/components/input/Numpad.vue";
import Datepicker from "@/components/input/Datepicker.vue";
import { TransactionType } from "../../api/entity/enum/transaction.type";
import TransactionTarget from "@/components/transactions/Transaction.target.vue";
import { mapActions, mapGetters } from "vuex";
import { TRANSACTIONS } from "../../store/types/transactions.types";
import { TransactionCreate } from "../../api/entity/transactions/transaction.create.entity";
import EntityCardCompact from "@/components/cards/EntityCardCompact.vue";
import { CATEGORIES } from "@/store/types/categories.types";
import { ACCOUNTS } from "@/store/types/accounts.types";
export default Vue.extend({
  components: {
    Numpad,
    Datepicker,
    TransactionTarget,
    EntityCardCompact,
  },
  props: {
    value: { type: Boolean, default: false },
    type: { type: Number, default: TransactionType.EXPENSE },
    accountId: { type: Number, default: null },
    accountTargetId: { type: Number, default: null },
    categoryId: { type: Number, default: null },
  },
  data: () => ({
    tab: 0,
    balance: 0,
    date: "",
    name: "",
    account: { id: 0, name: "", color: "", logo: "person" },
    accountTarget: { id: 0, name: "", color: "", logo: "person" },
    category: { id: 0, name: "", color: "", logo: "person" },
  }),
  computed: {
    ...mapGetters({
      categories: CATEGORIES.CATEGORIES,
      getCategory: CATEGORIES.GET,
      accounts: ACCOUNTS.ACCOUNTS,
      getAccount: ACCOUNTS.GET,
    }),
    isExpense(): boolean {
      return this.type === TransactionType.EXPENSE;
    },
    isTransfer(): boolean {
      return this.type === TransactionType.TRANSFER;
    },

    transaction(): TransactionCreate {
      const id = 0;
      const name = this.name;
      const type = this.type;
      const value =
        this.type !== TransactionType.EXPENSE ? this.balance : -this.balance;
      const date = this.date;
      const accountId = this.account.id;
      const accountTargetId = this.accountTargetId;
      const categoryId = this.categoryId;
      return {
        id,
        name,
        type,
        value,
        date,
        accountId,
        accountTargetId,
        categoryId,
      };
    },
  },
  methods: {
    ...mapActions({ create: TRANSACTIONS.CREATE }),
    submit() {
      this.$emit("submit");
      this.$emit("input", false);
      this.create(this.transaction);
    },
    initiateDate() {
      const date = new Date(),
        y = date.getFullYear(),
        m = date.getMonth();
      const year = date.getUTCFullYear().toString();
      const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      this.date = `${year}-${month}-${day}`;
    },
    initiateEntities() {
      this.account = this.accountId
        ? this.getAccount(this.accountId)
        : this.accounts[0];
      if (this.isTransfer) {
        this.accountTarget = this.getAccount(this.accountTargetId);
      }
      if (this.isExpense) {
        this.category = this.categoryId
          ? this.getCategory(this.categoryId)
          : this.categories[0];
      }
    },
  },
  watch: {
    value(val, oldVal) {
      this.balance = 0;
    },
  },
  mounted() {
    this.initiateDate();
    this.initiateEntities();
  },
});
</script>
<style scoped>
</style>