<template>
  <v-card tile elevation="5" max-width="500" @click="$emit('click')">
    <div />
    <v-avatar :tile="!circle" :color="color || 'primary'" size="60">
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
    subtitle: Number,
    text: String,
    circle: { type: Boolean, default: false }
  }
});
</script>
<style scoped>
.v-card {
  margin: 30px;
  transform: skewX(-5deg);
  transition: 0.3s;
}
.v-card:hover {
  cursor: pointer;
  transform: scale(1.1);
}
.v-card:hover .v-avatar {
  transform: translateY(-60%) translateX(100%);
}
.v-avatar {
  transform: translateY(-40%) translateX(100%);
  margin-bottom: -30px;
  transition: 0.3s;
}
</style>