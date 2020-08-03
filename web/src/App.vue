<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions } from "vuex";
import { SETTINGS } from "@/store/types/settings.types";

export default Vue.extend({
  name: "App",

  components: {},

  data: () => ({
    //
  }),
  methods: {
    ...mapActions({ loadSettings: SETTINGS.GET }),
  },
  mounted() {
    this.loadSettings();
  },
});
</script>
<style>
.mani-color-success {
  color: var(--v-success-base) !important;
}
.mani-color-error {
  color: var(--v-error-base) !important;
}
.mani-transaction-item-date {
  position: absolute;
  top: 0;
  right: 0;
}
.mani-entity-card-container {
  margin: 30px;
  transform: skewX(-5deg);
  transition: 0.3s !important;
}
.mani-entity-card-container:hover {
  cursor: pointer;
  transform: scale(1.1);
}
.mani-entity-card-container:hover .mani-entity-card-avatar {
  transform: translateY(-60%) translateX(100%);
}
.mani-entity-card-avatar {
  transform: translateY(-40%) translateX(100%) skewX(5deg);
  margin-bottom: -30px;
  transition: 0.3s;
  z-index: 2;
}
.mani-info-panel-button {
  width: 100%;
}
.mani-info-panel-container {
  height: 100%;
}
.mani-info-panel-avatar {
  margin-bottom: 20px;
}
.mani-info-panel-avatar:hover {
  cursor: pointer;
}
</style>