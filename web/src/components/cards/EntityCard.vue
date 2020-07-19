<template>
  <v-card
    class="mani-entity-card-container"
    tile
    elevation="5"
    max-width="500"
    @click="$emit('click')"
  >
    <div />
    <v-avatar class="mani-entity-card-avatar" :tile="!circle" :color="color || 'primary'" size="60">
      <v-icon large color="white">{{avatar || 'person'}}</v-icon>
    </v-avatar>
    <v-card-title v-if="title">{{title}}</v-card-title>
    <v-card-subtitle v-if="subtitle">{{subtitle}}</v-card-subtitle>
    <v-card-text v-if="text">{{text}}</v-card-text>
  </v-card>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    avatar: String,
    color: String,
    title: String,
    subtitle: String,
    text: String,
    circle: { type: Boolean, default: false }
  }
});
</script>
<style scoped>
</style>