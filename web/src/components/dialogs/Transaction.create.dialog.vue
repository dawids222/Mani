<template>
  <v-dialog :value="value" max-width="300" max-height="700" @input="$emit('input', $event)">
    <v-card>
      <v-card-actions />
      <v-card-text>
        <v-layout row wrap class="mb-5">
          <v-flex xs6>
            <transaction-target v-model="account" />
          </v-flex>
          <v-flex xs6>
            <transaction-target v-model="target" :circle="true" />
          </v-flex>
        </v-layout>
        <v-text-field v-model="name" :label="$t('transactionNameLabel')" outlined></v-text-field>
        <datepicker v-model="date" :label="$t('date')" />
        <numpad v-model="balance" @submit="submit" />
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
import { mapActions } from "vuex";
import { TRANSACTIONS } from "../../store/types/transactions.types";
import { TransactionCreate } from "../../api/entity/transactions/transaction.create.entity";
export default Vue.extend({
  components: {
    Numpad,
    Datepicker,
    TransactionTarget,
  },
  props: {
    value: { type: Boolean, default: false },
    type: { type: Number, default: TransactionType.EXPENSE },
  },
  data: () => ({
    balance: 0,
    date: "",
    name: "",
    account: {
      id: 4,
      name: "NEST konto",
      logo: "person",
      color: "#00ff00",
    },
    target: {
      id: 3,
      name: "zdrowie",
      logo: "add",
      color: "#005000",
    },
  }),
  computed: {
    transaction(): TransactionCreate {
      const id = 0;
      const name = this.name;
      const type = this.type;
      const value =
        this.type !== TransactionType.EXPENSE ? this.balance : -this.balance;
      const date = this.date;
      const accountId = this.account.id;
      const accountTargetId = null;
      const categoryId = this.target.id;
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
      this.create(this.transaction);
    },
  },
  watch: {
    value(val, oldVal) {
      this.balance = 0;
    },
  },
  mounted() {
    const date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth();
    const year = date.getUTCFullYear().toString();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    this.date = `${year}-${month}-${day}`;
  },
});
</script>
<style scoped>
</style>