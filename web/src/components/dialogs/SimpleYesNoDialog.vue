<template>
  <v-dialog :value="value" max-width="500" max-height="700" @input="$emit('input', $event)">
    <v-card>
      <v-card-title v-if="title">{{title}}</v-card-title>
      <v-card-text v-if="message">{{message}}</v-card-text>
      <v-card-actions jus>
        <v-spacer></v-spacer>
        <v-btn color="error" @click="onNoClick">{{$t('no')}}</v-btn>
        <v-btn color="success" @click="$emit('onYesClick')">{{$t('yes')}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    value: { type: Boolean },
    title: { type: String },
    message: { type: String },
  },
  methods: {
    onNoClick() {
      this.$emit("onNoClick");
      this.$emit("input", false);
    },
  },
});
</script>
<style scoped>
</style>