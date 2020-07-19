<template>
  <v-container v-if="value">
    <v-text-field v-model="value.name" :label="$t('accountNameLabel')" outlined></v-text-field>
    <v-text-field v-model="value.balance" :label="$t('accountBalanceLabel')" outlined></v-text-field>
    <v-text-field v-model="value.description" :label="$t('accountDescriptionLabel')" outlined></v-text-field>
    <v-btn bottom depressed large color="primary">{{ $t('save') }}</v-btn>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    value: { type: Object }
  }
});
</script>
<style scoped>
.v-btn {
  width: 100%;
}
.container {
  height: 100%;
}
</style>