<template>
  <v-card class="mani-entity-card-container" elevation="5" @click="$emit('click')">
    <div />
    <v-avatar
      class="mani-entity-card-avatar"
      :tile="!avatar.circle"
      :color="avatar.color"
      size="60"
    >
      <v-icon large color="white">{{ avatar.logo }}</v-icon>
    </v-avatar>
    <v-card-title>{{transaction.name}}</v-card-title>
    <v-card-subtitle>{{transaction.account.name}}</v-card-subtitle>
    <v-card-text
      :class="{
        'mani-transaction-item-value': true,
        'mani-color-transfer': isTransfer,
        'mani-color-success': !isTransfer && transaction.value > 0,
        'mani-color-error': !isTransfer && transaction.value < 0,
      }"
    >{{transaction.value}} {{currency}}</v-card-text>
  </v-card>
</template>
<script lang="ts">
import Vue from "vue";
import { Account } from "@/api/entity/account/account.entity";
import { Category } from "@/api/entity/category/category.entity";
import { mapGetters } from "vuex";
import { SETTINGS } from "../../store/types/settings.types";
import { TransactionType } from "@/api/entity/enum/transaction.type";
export default Vue.extend({
  props: {
    transaction: { type: Object },
  },
  computed: {
    ...mapGetters({ currency: SETTINGS.CURRENCY }),
    isTransfer(): boolean {
      return this.transaction.type === TransactionType.TRANSFER;
    },
    avatar(): any {
      const account: Account = this.transaction.account;
      const category: Category = this.transaction.category;
      return category
        ? {
            logo: category.logo,
            color: category.color,
            circle: true,
          }
        : {
            logo: account.logo,
            color: account.color,
            circle: false,
          };
    },
  },
});
</script>
<style scoped>
.mani-entity-card-container .mani-transaction-item-value {
  font-size: 125%;
}
.mani-color-transfer {
  color: gray;
}
</style>