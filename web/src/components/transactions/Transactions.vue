<template>
  <v-main>
    <v-layout row wrap>
      <v-flex xs6>
        <datepicker label="From" />
      </v-flex>
      <v-flex xs6>
        <datepicker label="To" />
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex v-for="(transaction, index) in transactions" :key="index" xs12>
        <v-card>
          <v-card-title>{{transaction.name}}</v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-main>
</template>
<script lang="ts">
import Vue from "vue";
import Datepicker from "@/components/input/Datepicker.vue";
import { mapGetters, mapActions } from "vuex";
import { TRANSACTIONS } from "../../store/types/transactions.types";
export default Vue.extend({
  components: {
    Datepicker
  },
  data: () => ({}),
  computed: {
    ...mapGetters({ transactions: TRANSACTIONS.TRANSACTIONS })
  },
  methods: {
    ...mapActions({ load: TRANSACTIONS.GET_ALL })
  },
  mounted() {
    this.load().then(x => console.log(this.transactions));
  }
});
</script>
<style scoped>
.th {
  display: none !important;
}
</style>