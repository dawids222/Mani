<template>
  <v-layout row wrap>
    <v-flex xs12 class="mani-numpad-display-container">
      <div class="mani-numpad-display-content">{{val}}</div>
    </v-flex>
    <v-flex xs3>
      <v-btn @click="add(7)">7</v-btn>
    </v-flex>
    <v-flex xs3>
      <v-btn @click="add(8)">8</v-btn>
    </v-flex>
    <v-flex xs3>
      <v-btn @click="add(9)">9</v-btn>
    </v-flex>
    <v-flex xs3>
      <v-btn @click="clear">CE</v-btn>
    </v-flex>
    <v-flex xs3>
      <v-btn @click="add(4)">4</v-btn>
    </v-flex>
    <v-flex xs3>
      <v-btn @click="add(5)">5</v-btn>
    </v-flex>
    <v-flex xs3>
      <v-btn @click="add(6)">6</v-btn>
    </v-flex>
    <v-flex xs3>
      <v-btn @click="back">&larr;</v-btn>
    </v-flex>
    <v-flex xs3>
      <v-btn @click="add(1)">1</v-btn>
    </v-flex>
    <v-flex xs3>
      <v-btn @click="add(2)">2</v-btn>
    </v-flex>
    <v-flex xs3>
      <v-btn @click="add(3)">3</v-btn>
    </v-flex>
    <v-flex xs3>
      <v-btn></v-btn>
    </v-flex>
    <v-flex xs3>
      <v-btn></v-btn>
    </v-flex>
    <v-flex xs3>
      <v-btn @click="add(0)">0</v-btn>
    </v-flex>
    <v-flex xs3>
      <v-btn @click="decimal">.</v-btn>
    </v-flex>
    <v-flex xs3>
      <v-btn @click="submit">
        <v-icon>check</v-icon>
      </v-btn>
    </v-flex>
  </v-layout>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    value: { type: Number, default: 0 },
  },
  data: function () {
    return {
      val: this.value.toString(),
    };
  },
  methods: {
    add(val: number) {
      if (this.val.length === 22) {
        return;
      }
      if (this.val === "0") {
        this.val = val.toString();
      } else {
        this.val += val;
      }
      this.$emit("input", Number(this.val));
    },
    decimal() {
      if (!this.val.includes(".")) {
        this.val += ".";
      }
      this.$emit("input", Number(this.val));
    },
    clear() {
      this.val = "0";
      this.$emit("input", Number(this.val));
    },
    back() {
      const newVal = this.val.slice(0, -1);
      this.val = newVal.length > 0 ? newVal : "0";
      this.$emit("input", Number(this.val));
    },
    submit() {
      this.$emit("input", Number(this.val));
      this.$emit("submit");
    },
  },
  mounted() {
    window.addEventListener("keydown", (e) => {
      const ENTER = 13;
      const BACKSPACE = 8;
      const DECIMALS = [110, 188, 190];
      const NUMBERS = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
      const NUMPADS = [96, 97, 98, 99, 100, 101, 102, 103, 104, 105];
      if (e.keyCode === ENTER) {
        this.submit();
      }
      if (e.keyCode === BACKSPACE) {
        this.back();
      }
      if (DECIMALS.includes(e.keyCode)) {
        this.decimal();
      }
      if (NUMBERS.includes(e.keyCode)) {
        this.add(e.keyCode - 48);
      }
      if (NUMPADS.includes(e.keyCode)) {
        this.add(e.keyCode - 96);
      }
    });
  },
});
</script>
<style scoped>
.flex {
  transform: scale(0.95);
}
.v-btn {
  height: 50px !important;
  width: 100%;
}
.mani-numpad-display-container {
  border: 1px solid black;
  border-radius: 10px;
  height: 50px;
  margin-bottom: 10px;
  color: black;
  font-size: 1.4em;
  font-weight: bold;
}
.mani-numpad-display-content {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding-left: 10px;
}
</style>