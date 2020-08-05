<template>
  <v-card @click="click">
    <div />
    <v-avatar :color="value.color" :tile="!circle" size="32">
      <v-icon color="#fff">{{value.logo}}</v-icon>
    </v-avatar>
    <v-card-title></v-card-title>
    <v-card-text>{{value.name}}</v-card-text>
  </v-card>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    circle: { type: Boolean, default: false },
    value: { type: Object },
  },
  data: () => ({}),
  methods: {
    click() {
      return;
    },
  },
});
</script>
<style scoped>
.v-avatar {
  position: absolute;
  top: 0px;
  left: 10px;
  transform: translateY(-50%);
  z-index: 2;
}
.v-card {
  margin: 6px 6px 0px 6px;
}
.v-card:hover {
  transform: scale(1.05);
  cursor: pointer;
}
</style>