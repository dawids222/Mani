<template>
  <v-card class="ma-3 mani-clickable mani-scale-on-hover" @click="click">
    <v-card-title>
      <div class="center">{{entity.name}}</div>
    </v-card-title>
    <v-card-text>
      <v-avatar :color="entity.color" :tile="!circle">
        <v-icon color="white">{{entity.logo}}</v-icon>
      </v-avatar>
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    entity: { type: Object },
    circle: { type: Boolean, default: false },
  },
  methods: {
    click() {
      this.$emit("click");
    },
  },
});
</script>
<style scoped>
.v-avatar {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
.center {
  width: 100% !important;
  text-align: center;
}
</style>