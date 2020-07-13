<template>
  <v-card tile elevation="5" max-width="500" @click="$emit('click')">
    <div />
    <v-card-title primary-title class="justify-center">
      <v-avatar size="60" image>
        <v-icon large color="green">add</v-icon>
      </v-avatar>
    </v-card-title>
    <div />
  </v-card>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>
<style scoped>
.v-card {
  margin: 30px;
  transform: skewX(-5deg);
  transition: 0.3s;
  height: 154px;
  border: 2px green dashed;
}
.v-card__title {
  height: 100%;
}
.v-card:hover {
  cursor: pointer;
  transform: scale(1.1);
}
.v-avatar {
  border: 2px green dashed;
}
</style>