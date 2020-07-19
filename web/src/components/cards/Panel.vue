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
  width: 100%;
  max-height: 90vh;
  padding: 20px;
  margin: 15px;
  overflow-y: auto;
}
</style>