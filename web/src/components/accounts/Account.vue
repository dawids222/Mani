<template>
  <v-main>
    <v-layout row wrap>
      <v-flex xs12 sm6 md5>
        <panel class="panel">lol</panel>
      </v-flex>
      <v-flex xs12 sm6 md7>
        <panel class="panel"></panel>
      </v-flex>
      <v-flex xs12 sm6 md7>
        <panel class="panel"></panel>
      </v-flex>
      <v-flex xs12 sm6 md5>
        <panel class="panel"></panel>
      </v-flex>
    </v-layout>
  </v-main>
</template>
<script lang="ts">
import Vue from "vue";
import Panel from "@/components/cards/Panel.vue";
export default Vue.extend({
  components: {
    Panel
  }
});
</script>
<style scoped>
.panel {
  height: 400px;
}
</style>