<template>
  <validation-provider :name="name" :rules="rules" v-slot="{errors}">
    <v-text-field
      :value="value"
      :label="$t(label)"
      outlined
      :error-messages="errors"
      @input="$emit('input', $event)"
    ></v-text-field>
  </validation-provider>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    value: String,
    name: String,
    rules: String,
    label: String,
  },
});
</script>
<style scoped>
</style>