<template>
  <v-card elevation="5">
    <slot />
  </v-card>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>
<style scoped>
.v-card {
  padding: 20px;
  margin: 15px;
}
</style>