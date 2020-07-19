<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-btn bottom depressed large color="primary">{{ $t('accountTransferLabel') }}</v-btn>
      </v-flex>
      <v-flex xs12>
        <v-btn bottom depressed large color="error">{{ $t('accountExpenseLabel') }}</v-btn>
      </v-flex>
      <v-flex xs12>
        <v-btn bottom depressed large color="success">{{ $t('accountIncomeLabel') }}</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
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