<template>
  <v-layout row wrap>
    <v-menu
      v-model="fromDateMenu"
      :close-on-content-click="false"
      :nudge-right="40"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field :label="label" prepend-icon="event" readonly :value="fromDateDisp" v-on="on"></v-text-field>
      </template>
      <v-date-picker
        locale="en-in"
        :min="minDate"
        :max="maxDate"
        v-model="fromDateVal"
        no-title
        @input="fromDateMenu = false"
      ></v-date-picker>
    </v-menu>
  </v-layout>
</template>
<script>
export default {
  props: {
    minDate: { type: String, default: "" },
    maxDate: { type: String, default: "" },
    label: String
  },
  data: () => ({
    fromDateMenu: false,
    fromDateVal: null
  }),
  computed: {
    fromDateDisp() {
      return this.fromDateVal;
      // format date, apply validations, etc. Example below.
      // return this.fromDateVal ? this.formatDate(this.fromDateVal) : "";
    }
  },
  watch: {
    fromDateVal(val, oldVal) {
      this.$emit("selected", val);
    }
  }
};
</script>