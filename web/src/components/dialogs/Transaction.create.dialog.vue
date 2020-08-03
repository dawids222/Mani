<template>
  <v-dialog :value="value" max-width="300" max-height="700" @input="$emit('input', $event)">
    <v-card>
      <v-card-actions />
      <v-card-text>
        <numpad v-model="balance" @submit="$emit('submit')" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import Vue from "vue";
import Numpad from "@/components/input/Numpad.vue";
export default Vue.extend({
  components: {
    Numpad,
  },
  props: {
    value: { type: Boolean, default: false },
  },
  data: () => ({
    balance: 0,
  }),
  watch: {
    value(val, oldVal) {
      this.balance = 0;
    },
  },
});
</script>
<style scoped>
</style>