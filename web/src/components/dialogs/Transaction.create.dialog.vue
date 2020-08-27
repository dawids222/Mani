<template>
  <v-dialog :value="value" max-width="500" max-height="700" @input="$emit('input', $event)">
    <simple-yes-no-dialog
      v-model="dialog"
      :title="$t('deleteDialogTitle')"
      :message="$t('deleteTransactionDialogMessage')"
      @onYesClick="onDeleteClick"
    />
    <v-card>
      <v-card-actions />
      <v-card-text v-if="tab === 0">
        <v-layout row wrap class="mb-5">
          <v-flex>
            <transaction-target v-model="model.account" @click="tab = 1" />
          </v-flex>
          <v-flex xs6 v-if="isExpense">
            <transaction-target v-model="model.category" :circle="true" @click="tab = 2" />
          </v-flex>
          <v-flex xs6 v-if="isTransfer">
            <transaction-target v-model="model.accountTarget" :circle="false" @click="tab = 3" />
          </v-flex>
        </v-layout>
        <validation-observer ref="form" v-slot="{ handleSubmit }">
          <validation-text-field
            name="name"
            rules="required|min:1|max:50"
            v-model="model.name"
            label="transactionNameLabel"
          />
          <datepicker v-model="model.date" :label="$t('date')" />
          <numpad v-model="model.balance" @submit="handleSubmit(submit)" />
        </validation-observer>
        <v-btn v-if="editMode" color="error" class="mt-5" block @click="dialog=true">
          {{$t('delete') }}
          <v-icon>delete</v-icon>
        </v-btn>
      </v-card-text>
      <v-card-text v-if="tab === 1">
        <v-layout row wrap>
          <v-flex xs4 v-for="(acc, index) in accounts" :key="index">
            <entity-card-compact
              :entity="acc"
              :circle="false"
              @click="tab = 0; model.account = acc"
            />
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-text v-if="tab === 2">
        <v-layout row wrap>
          <v-flex xs4 v-for="(cat, index) in categories" :key="index">
            <entity-card-compact
              :entity="cat"
              :circle="true"
              @click="tab = 0; model.category = cat"
            />
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-text v-if="tab === 3">
        <v-layout row wrap>
          <v-flex xs4 v-for="(acc, index) in accounts" :key="index">
            <entity-card-compact
              :entity="acc"
              :circle="false"
              @click="tab = 0; model.accountTarget = acc"
            />
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
import SimpleYesNoDialog from "../dialogs/SimpleYesNoDialog.vue";
export default Vue.extend({
  components: {
    Numpad,
    Datepicker,
    TransactionTarget,
    EntityCardCompact,
    SimpleYesNoDialog,
  },
  props: {
    value: { type: Boolean, default: false },
    transactionId: { type: Number, default: 0 },
    name: { type: String, default: "" },
    date: { type: String, default: "" },
    balance: { type: Number, default: 0 },
    type: { type: Number, default: TransactionType.EXPENSE },
    accountId: { type: Number, default: null },
    accountTargetId: { type: Number, default: null },
    categoryId: { type: Number, default: null },
    editMode: { type: Boolean, default: false },
  },
  data: () => ({
    dialog: false,
    tab: 0,
    model: {
      id: 0,
      balance: 0,
      date: "",
      name: "",
      account: { id: 0, name: "", color: "", logo: "person" },
      accountTarget: { id: 0, name: "", color: "", logo: "person" },
      category: { id: 0, name: "", color: "", logo: "person" },
    },
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
      const id = this.model.id;
      const name = this.model.name;
      const type = this.type;
      const value =
        this.type !== TransactionType.EXPENSE
          ? this.model.balance
          : -this.model.balance;
      const date = this.model.date;
      const accountId = this.model.account.id;
      const accountTargetId =
        this.model.accountTarget.id !== 0 ? this.model.accountTarget.id : null;
      const categoryId =
        this.model.category.id !== 0 ? this.model.category.id : null;
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
    ...mapActions({
      create: TRANSACTIONS.CREATE,
      edit: TRANSACTIONS.EDIT,
      delete: TRANSACTIONS.DELETE,
    }),
    submit() {
      this.$emit("submit");
      this.$emit("input", false);
      if (this.editMode) {
        this.edit(this.transaction);
      } else {
        this.create(this.transaction);
      }
    },
    initiateDate() {
      if (this.date) {
        this.model.date = this.date;
        return;
      }
      const date = new Date(),
        y = date.getFullYear(),
        m = date.getMonth();
      const year = date.getUTCFullYear().toString();
      const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      this.model.date = `${year}-${month}-${day}`;
    },
    initiateEntities() {
      this.model.id = this.transactionId;
      this.model.name = this.name;
      this.model.balance = Math.abs(this.balance);
      this.model.account = this.accountId
        ? this.getAccount(this.accountId)
        : this.accounts[0];
      if (this.isTransfer && this.accountTargetId) {
        this.model.accountTarget = this.getAccount(this.accountTargetId);
      }
      if (this.isExpense && this.categoryId) {
        this.model.category = this.getCategory(this.categoryId);
      }
    },
    onDeleteClick() {
      this.delete(this.transactionId);
      this.$emit("input", false);
    },
  },
  watch: {
    value(val, oldVal) {
      this.model.balance = 0;
    },
  },
  created() {
    this.initiateDate();
    this.initiateEntities();
  },
});
</script>
<style scoped>
</style>