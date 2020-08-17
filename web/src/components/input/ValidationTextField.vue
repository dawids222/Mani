<template>
  <validation-provider :name="name" :rules="rules" v-slot="{errors}">
    <v-text-field
      :value="value"
      :label="$t(label)"
      :error-messages="errors"
      :append-icon="icon"
      :outlined="outlined"
      @input="$emit('input', $event)"
      :type="type"
      @keyup="$emit('keyup', $event)"
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
    icon: String,
    outlined: { type: Boolean, default: true },
    type: { type: String, default: "text" },
  },
});
</script>
<style scoped>
</style>